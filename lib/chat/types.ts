export type ConsentMode = "persist_30d" | "no_store";
export type ChatRole = "user" | "assistant";
export type Classification =
  | "in_scope"
  | "smalltalk"
  | "unrelated"
  | "prompt_injection"
  | "unsafe"
  | "needs_clarification";

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface ChatRequest {
  sessionId: string;
  sessionToken: string;
  consent: ConsentMode;
  messages: ChatMessage[];
  consentVersion: string;
}

export interface ChatSource {
  id: "website" | "resume" | "profile";
  label: "Website" | "Résumé" | "Profile note";
  href: string;
}

export interface StoredMessage extends ChatMessage {
  createdAt: string;
  sourceIds?: ChatSource["id"][];
}

export interface StoredSession {
  sessionId: string;
  tokenHash: string;
  createdAt: string;
  expiresAt: number;
  consentVersion: string;
  messages: StoredMessage[];
  feedback?: "helpful" | "not_helpful";
}

export type SseEvent =
  | { type: "meta"; standIn: true; persisted: boolean }
  | { type: "delta"; text: string }
  | { type: "sources"; sources: ChatSource[] }
  | { type: "done" }
  | { type: "error"; message: string; code: string };
