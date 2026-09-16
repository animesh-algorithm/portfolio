import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().trim().min(1).max(800),
});

export const chatRequestSchema = z
  .object({
    sessionId: z.string().regex(/^[A-Za-z0-9_-]{20,100}$/),
    sessionToken: z.string().regex(/^[A-Za-z0-9_-]{32,160}$/),
    consent: z.enum(["persist_30d", "no_store"]),
    consentVersion: z.string().regex(/^v\d+(?:\.\d+)?$/).max(16),
    messages: z.array(messageSchema).min(1).max(16),
  })
  .superRefine((value, context) => {
    const userTurns = value.messages.filter((message) => message.role === "user");
    const assistantTurns = value.messages.filter(
      (message) => message.role === "assistant",
    );
    if (userTurns.length > 8 || assistantTurns.length > 8) {
      context.addIssue({
        code: "custom",
        path: ["messages"],
        message: "At most eight recent turns per role are allowed",
      });
    }
    if (value.messages.at(-1)?.role !== "user") {
      context.addIssue({
        code: "custom",
        path: ["messages"],
        message: "The final message must be from the user",
      });
    }
  });

export const deleteSessionSchema = z.object({
  sessionId: z.string().regex(/^[A-Za-z0-9_-]{20,100}$/),
  sessionToken: z.string().regex(/^[A-Za-z0-9_-]{32,160}$/),
});
