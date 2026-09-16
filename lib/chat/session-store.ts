import { createHash, timingSafeEqual } from "node:crypto";
import { Redis } from "@upstash/redis";
import { redactVisitorContact } from "./redaction";
import type { ChatMessage, StoredSession } from "./types";

export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function tokenMatches(token: string, expectedHash: string) {
  const actual = Buffer.from(hashToken(token), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createStoredSession({
  sessionId,
  sessionToken,
  consentVersion,
  messages,
  now = Date.now(),
}: {
  sessionId: string;
  sessionToken: string;
  consentVersion: string;
  messages: ChatMessage[];
  now?: number;
}): StoredSession {
  return {
    sessionId,
    tokenHash: hashToken(sessionToken),
    createdAt: new Date(now).toISOString(),
    expiresAt: now + SESSION_TTL_MS,
    consentVersion,
    messages: messages.map((message) => ({
      ...message,
      text: redactVisitorContact(message.text),
      createdAt: new Date(now).toISOString(),
    })),
  };
}

function mergeMessages(
  existing: StoredSession["messages"],
  incoming: StoredSession["messages"],
) {
  const maxOverlap = Math.min(existing.length, incoming.length);
  let overlap = 0;
  for (let length = maxOverlap; length > 0; length -= 1) {
    const matches = existing.slice(-length).every((message, index) => {
      const candidate = incoming[index];
      return message.role === candidate.role && message.text === candidate.text;
    });
    if (matches) {
      overlap = length;
      break;
    }
  }
  return [...existing, ...incoming.slice(overlap)];
}

export class SessionStore {
  constructor(private readonly redis: Redis) {}

  private key(sessionId: string) {
    return `ask:session:${sessionId}`;
  }

  async save(
    input: Parameters<typeof createStoredSession>[0],
  ): Promise<StoredSession> {
    const key = this.key(input.sessionId);
    const existing = await this.redis.get<StoredSession>(key);
    const incoming = createStoredSession(input);
    if (existing && !tokenMatches(input.sessionToken, existing.tokenHash)) {
      throw new Error("Session token mismatch");
    }
    const session = existing
      ? {
          ...existing,
          consentVersion: input.consentVersion,
          messages: mergeMessages(existing.messages, incoming.messages),
        }
      : incoming;
    await this.redis.set(key, session, { pxat: session.expiresAt });
    return session;
  }

  async delete(sessionId: string, sessionToken: string) {
    const key = this.key(sessionId);
    const existing = await this.redis.get<StoredSession>(key);
    if (!existing || !tokenMatches(sessionToken, existing.tokenHash)) return false;
    await this.redis.del(key);
    return true;
  }
}

export function getSessionStore() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new SessionStore(new Redis({ url, token }));
}
