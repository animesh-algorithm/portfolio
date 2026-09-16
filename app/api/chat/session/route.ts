import { getSessionStore } from "@/lib/chat/session-store";
import { deleteSessionSchema } from "@/lib/chat/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = deleteSessionSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const store = getSessionStore();
  if (!store) {
    return Response.json(
      { error: "Saved chat is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const deleted = await store.delete(
      parsed.data.sessionId,
      parsed.data.sessionToken,
    );
    return deleted
      ? new Response(null, { status: 204 })
      : Response.json({ error: "Session not found." }, { status: 404 });
  } catch {
    return Response.json(
      { error: "Saved chat is temporarily unavailable." },
      { status: 503 },
    );
  }
}
