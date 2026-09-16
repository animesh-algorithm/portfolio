import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";
import { handleChat, type ChatDependencies } from "../lib/chat/handler";

function request() {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.12",
    },
    body: JSON.stringify({
      sessionId: "a".repeat(24),
      sessionToken: "b".repeat(43),
      consent: "no_store",
      consentVersion: "v1",
      messages: [{ role: "user", text: "What did you build at Gradly?" }],
    }),
  });
}

function dependencies(overrides: Partial<ChatDependencies> = {}): ChatDependencies {
  const ai = {
    moderate: vi.fn().mockResolvedValue(false),
    classify: vi.fn().mockResolvedValue("in_scope"),
    hasEvidence: vi.fn().mockResolvedValue(true),
    streamAnswer: vi.fn().mockResolvedValue({
      deltas: (async function* () {
        yield "I built ";
        yield "systems.";
      })(),
      sources: vi.fn().mockResolvedValue([
        { id: "website", label: "Website", href: "/#work" },
      ]),
    }),
  };
  return {
    ai: ai as never,
    rateLimiter: { check: vi.fn().mockResolvedValue({ allowed: true, retryAfterSeconds: 0 }) } as never,
    sessionStore: { save: vi.fn(), delete: vi.fn() } as never,
    rateLimitSalt: "test-salt",
    ...overrides,
  };
}

describe("POST /api/chat core", () => {
  it("streams meta, text, trusted sources, and done", async () => {
    const response = await handleChat(request(), dependencies());
    const body = await response.text();
    expect(response.status).toBe(200);
    expect(body).toContain("event: meta");
    expect(body).toContain("I built ");
    expect(body).toContain("Website");
    expect(body).toContain("event: done");
  });

  it("returns a grounded abstention when retrieval has no evidence", async () => {
    const deps = dependencies();
    (deps.ai!.hasEvidence as ReturnType<typeof vi.fn>) = vi.fn().mockResolvedValue(false);
    const body = await (await handleChat(request(), deps)).text();
    expect(body).toContain("isn’t in my approved public sources");
    expect(body).not.toContain("I built systems");
  });

  it.each(["unrelated", "prompt_injection", "unsafe", "needs_clarification"])(
    "handles the %s refusal category without retrieval",
    async (classification) => {
      const deps = dependencies();
      (deps.ai!.classify as ReturnType<typeof vi.fn>) = vi
        .fn()
        .mockResolvedValue(classification);
      const body = await (await handleChat(request(), deps)).text();
      expect(body).toContain("event: done");
      expect(deps.ai!.hasEvidence).not.toHaveBeenCalled();
    },
  );

  it("sanitizes an OpenAI timeout", async () => {
    const deps = dependencies();
    (deps.ai!.moderate as ReturnType<typeof vi.fn>) = vi
      .fn()
      .mockRejectedValue(new Error("secret upstream timeout detail"));
    const response = await handleChat(request(), deps);
    const body = await response.text();
    expect(response.status).toBe(503);
    expect(body).toContain("temporarily unavailable");
    expect(body).not.toContain("secret upstream");
  });

  it("emits a sanitized error for a malformed upstream stream", async () => {
    const deps = dependencies();
    (deps.ai!.streamAnswer as ReturnType<typeof vi.fn>) = vi.fn().mockResolvedValue({
      deltas: (async function* () {
        yield "Partial";
        throw new Error("malformed event");
      })(),
      sources: vi.fn(),
    });
    const body = await (await handleChat(request(), deps)).text();
    expect(body).toContain("generation_failed");
    expect(body).not.toContain("malformed event");
  });

  it("returns 429 with retry guidance", async () => {
    const response = await handleChat(
      request(),
      dependencies({
        rateLimiter: {
          check: vi.fn().mockResolvedValue({ allowed: false, retryAfterSeconds: 42 }),
        } as never,
      }),
    );
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("42");
  });

  it("fails closed when Redis rate limiting fails", async () => {
    const response = await handleChat(
      request(),
      dependencies({
        rateLimiter: {
          check: vi.fn().mockRejectedValue(new Error("redis down")),
        } as never,
      }),
    );
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("redis down");
  });
});
