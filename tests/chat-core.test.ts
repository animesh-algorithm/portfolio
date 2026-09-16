import { describe, expect, it } from "vitest";
import { chatRequestSchema } from "../lib/chat/validation";
import { redactVisitorContact } from "../lib/chat/redaction";
import { mapTrustedSources } from "../lib/chat/sources";
import {
  createStoredSession,
  hashToken,
  SESSION_TTL_MS,
  SessionStore,
  tokenMatches,
} from "../lib/chat/session-store";
import { RateLimiter } from "../lib/chat/rate-limit";

const validRequest = {
  sessionId: "a".repeat(24),
  sessionToken: "b".repeat(43),
  consent: "no_store",
  consentVersion: "v1",
  messages: [{ role: "user", text: "What did you build?" }],
};

describe("chat request validation", () => {
  it("accepts a bounded conversation", () => {
    expect(chatRequestSchema.safeParse(validRequest).success).toBe(true);
  });

  it("rejects long messages, invalid roles, and a non-user final turn", () => {
    expect(
      chatRequestSchema.safeParse({
        ...validRequest,
        messages: [{ role: "system", text: "x".repeat(801) }],
      }).success,
    ).toBe(false);
    expect(
      chatRequestSchema.safeParse({
        ...validRequest,
        messages: [{ role: "assistant", text: "hello" }],
      }).success,
    ).toBe(false);
  });
});

describe("privacy helpers", () => {
  it("redacts likely visitor email addresses and phone numbers", () => {
    expect(
      redactVisitorContact("Reach me at visitor@example.com or +1 (415) 555-0199"),
    ).toBe(
      "Reach me at [visitor email redacted] or [visitor phone redacted]",
    );
  });

  it("verifies deletion tokens without storing the raw token", () => {
    const hash = hashToken(validRequest.sessionToken);
    expect(hash).not.toContain(validRequest.sessionToken);
    expect(tokenMatches(validRequest.sessionToken, hash)).toBe(true);
    expect(tokenMatches("c".repeat(43), hash)).toBe(false);
  });
});

describe("source mapping", () => {
  it("maps only trusted files and de-duplicates chips", () => {
    expect(
      mapTrustedSources(["resume.md", "private.md", "resume.md", "profile.md"]),
    ).toEqual([
      { id: "resume", label: "Résumé", href: "/resume.pdf" },
      { id: "profile", label: "Profile note", href: "/#about" },
    ]);
  });
});

describe("fixed session expiry", () => {
  it("sets a 30-day deadline from creation", () => {
    const now = Date.UTC(2026, 8, 16);
    const session = createStoredSession({
      sessionId: validRequest.sessionId,
      sessionToken: validRequest.sessionToken,
      consentVersion: "v1",
      messages: validRequest.messages as [{ role: "user"; text: string }],
      now,
    });
    expect(session.expiresAt).toBe(now + SESSION_TTL_MS);
  });

  it("does not extend an existing session while saving new turns", async () => {
    let stored: unknown;
    let pxat = 0;
    const redis = {
      get: async () => stored,
      set: async (_key: string, value: unknown, options: { pxat: number }) => {
        stored = value;
        pxat = options.pxat;
        return "OK";
      },
      del: async () => 1,
    };
    const store = new SessionStore(redis as never);
    const first = await store.save({
      sessionId: validRequest.sessionId,
      sessionToken: validRequest.sessionToken,
      consentVersion: "v1",
      messages: validRequest.messages as [{ role: "user"; text: string }],
      now: 1_000,
    });
    const second = await store.save({
      sessionId: validRequest.sessionId,
      sessionToken: validRequest.sessionToken,
      consentVersion: "v1",
      messages: validRequest.messages as [{ role: "user"; text: string }],
      now: 50_000,
    });
    expect(second.expiresAt).toBe(first.expiresAt);
    expect(pxat).toBe(first.expiresAt);
  });

  it("rejects a different token for an existing session", async () => {
    const original = createStoredSession({
      sessionId: validRequest.sessionId,
      sessionToken: validRequest.sessionToken,
      consentVersion: "v1",
      messages: validRequest.messages as [{ role: "user"; text: string }],
      now: 1_000,
    });
    const redis = {
      get: async () => original,
      set: async () => "OK",
      del: async () => 1,
    };
    const store = new SessionStore(redis as never);
    await expect(
      store.save({
        sessionId: validRequest.sessionId,
        sessionToken: "c".repeat(43),
        consentVersion: "v1",
        messages: validRequest.messages as [{ role: "user"; text: string }],
      }),
    ).rejects.toThrow("Session token mismatch");
  });
});

describe("rate limiting", () => {
  it("enforces the ten-message short window", async () => {
    const counts = new Map<string, number>();
    const redis = {
      incr: async (key: string) => {
        const count = (counts.get(key) ?? 0) + 1;
        counts.set(key, count);
        return count;
      },
      expire: async () => 1,
    };
    const limiter = new RateLimiter(redis as never);
    for (let index = 0; index < 10; index += 1) {
      expect((await limiter.check("identity", 0)).allowed).toBe(true);
    }
    expect((await limiter.check("identity", 0)).allowed).toBe(false);
  });
});
