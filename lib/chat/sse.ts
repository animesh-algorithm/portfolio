import type { SseEvent } from "./types";

export const sseHeaders = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
};

export function encodeSse(event: SseEvent) {
  return `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
}
