import type { NextRequest } from "next/server";
import { refusalText } from "./prompts";
import { hashRateLimitIdentity } from "./rate-limit";
import { encodeSse, sseHeaders } from "./sse";
import type { AskOpenAI } from "./openai-service";
import type { RateLimiter } from "./rate-limit";
import type { SessionStore } from "./session-store";
import type { ChatRequest, SseEvent } from "./types";
import { chatRequestSchema } from "./validation";

export interface ChatDependencies {
  ai: AskOpenAI | null;
  rateLimiter: RateLimiter | null;
  sessionStore: SessionStore | null;
  rateLimitSalt?: string;
}

function eventResponse(event: SseEvent, status = 200, extraHeaders = {}) {
  return new Response(encodeSse(event), {
    status,
    headers: { ...sseHeaders, ...extraHeaders },
  });
}

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function handleChat(
  request: NextRequest,
  dependencies: ChatDependencies,
) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return eventResponse(
      { type: "error", code: "invalid_json", message: "Invalid request." },
      400,
    );
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return eventResponse(
      {
        type: "error",
        code: "invalid_request",
        message: "That message could not be sent. Check the input and try again.",
      },
      400,
    );
  }

  const payload = parsed.data satisfies ChatRequest;
  const { ai, rateLimiter, sessionStore } = dependencies;
  if (!ai || !rateLimiter || !dependencies.rateLimitSalt) {
    return eventResponse(
      {
        type: "error",
        code: "service_unavailable",
        message: "Ask Animesh is not configured yet. Please try again later.",
      },
      503,
    );
  }
  if (payload.consent === "persist_30d" && !sessionStore) {
    return eventResponse(
      {
        type: "error",
        code: "storage_unavailable",
        message: "Saved chat is temporarily unavailable. Continue without saving instead.",
      },
      503,
    );
  }

  try {
    const ipHash = hashRateLimitIdentity(
      `ip:${clientIp(request)}`,
      dependencies.rateLimitSalt,
    );
    const sessionHash = hashRateLimitIdentity(
      `session:${payload.sessionId}`,
      dependencies.rateLimitSalt,
    );
    const [ipLimit, sessionLimit] = await Promise.all([
      rateLimiter.check(ipHash),
      rateLimiter.check(sessionHash),
    ]);
    if (!ipLimit.allowed || !sessionLimit.allowed) {
      const retryAfterSeconds = Math.max(
        ipLimit.retryAfterSeconds,
        sessionLimit.retryAfterSeconds,
      );
      return eventResponse(
        {
          type: "error",
          code: "rate_limited",
          message: "That’s enough rapid-fire questions for now. Try again shortly.",
        },
        429,
        { "Retry-After": String(retryAfterSeconds) },
      );
    }

    const latest = payload.messages.at(-1)?.text ?? "";
    const unsafe = await ai.moderate(latest);
    const classification = unsafe ? "unsafe" : await ai.classify(latest);

    if (
      classification === "unrelated" ||
      classification === "prompt_injection" ||
      classification === "unsafe" ||
      classification === "needs_clarification"
    ) {
      const answer = refusalText[classification];
      if (payload.consent === "persist_30d" && sessionStore) {
        await sessionStore.save({
          sessionId: payload.sessionId,
          sessionToken: payload.sessionToken,
          consentVersion: payload.consentVersion,
          messages: [...payload.messages, { role: "assistant", text: answer }],
        });
      }
      const body = [
        encodeSse({
          type: "meta",
          standIn: true,
          persisted: payload.consent === "persist_30d",
        }),
        encodeSse({ type: "delta", text: answer }),
        encodeSse({ type: "sources", sources: [] }),
        encodeSse({ type: "done" }),
      ].join("");
      return new Response(body, { headers: sseHeaders });
    }

    if (classification === "in_scope" && !(await ai.hasEvidence(latest))) {
      const answer =
        "That isn’t in my approved public sources. Ask about the work, experience, projects, or public contact details that are documented here.";
      if (payload.consent === "persist_30d" && sessionStore) {
        await sessionStore.save({
          sessionId: payload.sessionId,
          sessionToken: payload.sessionToken,
          consentVersion: payload.consentVersion,
          messages: [...payload.messages, { role: "assistant", text: answer }],
        });
      }
      return new Response(
        [
          encodeSse({
            type: "meta",
            standIn: true,
            persisted: payload.consent === "persist_30d",
          }),
          encodeSse({ type: "delta", text: answer }),
          encodeSse({ type: "sources", sources: [] }),
          encodeSse({ type: "done" }),
        ].join(""),
        { headers: sseHeaders },
      );
    }

    const grounded = await ai.streamAnswer(payload.messages, sessionHash);
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let answer = "";
        const send = (event: SseEvent) =>
          controller.enqueue(encoder.encode(encodeSse(event)));
        try {
          send({
            type: "meta",
            standIn: true,
            persisted: payload.consent === "persist_30d",
          });
          for await (const delta of grounded.deltas) {
            answer += delta;
            send({ type: "delta", text: delta });
          }
          const sources = await grounded.sources();
          send({ type: "sources", sources });
          if (payload.consent === "persist_30d" && sessionStore) {
            await sessionStore.save({
              sessionId: payload.sessionId,
              sessionToken: payload.sessionToken,
              consentVersion: payload.consentVersion,
              messages: [
                ...payload.messages,
                { role: "assistant", text: answer },
              ],
            });
          }
          send({ type: "done" });
        } catch {
          send({
            type: "error",
            code: "generation_failed",
            message: "The answer stream failed. Please try again.",
          });
        } finally {
          controller.close();
        }
      },
    });
    return new Response(readable, { headers: sseHeaders });
  } catch {
    return eventResponse(
      {
        type: "error",
        code: "request_failed",
        message: "Ask Animesh is temporarily unavailable. Please try again.",
      },
      503,
    );
  }
}
