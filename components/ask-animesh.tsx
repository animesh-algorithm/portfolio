"use client";

import type { ChatMessage, ChatSource, ConsentMode } from "@/lib/chat/types";
import { ChatBubble, Spark } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const CONSENT_VERSION = process.env.NEXT_PUBLIC_CHAT_CONSENT_VERSION ?? "v1";
const BROWSER_STORAGE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const suggestedQuestions = [
  "What did you build at Gradly?",
  "Tell me how VisaFile works.",
  "What kind of problems are you best at?",
] as const;

interface UiMessage extends ChatMessage {
  id: string;
  sources?: ChatSource[];
}

interface AskContextValue {
  open: () => void;
}

const AskContext = createContext<AskContextValue | null>(null);

function randomToken(bytes = 32) {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...values))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function storageKey(consent: ConsentMode) {
  return `ask-animesh:${consent}:${CONSENT_VERSION}`;
}

function newIdentity() {
  return {
    sessionId: randomToken(24),
    sessionToken: randomToken(32),
    createdAt: Date.now(),
  };
}

function parseSseChunk(chunk: string) {
  const dataLine = chunk
    .split("\n")
    .find((line) => line.startsWith("data: "));
  if (!dataLine) return null;
  return JSON.parse(dataLine.slice(6)) as
    | { type: "meta" }
    | { type: "delta"; text: string }
    | { type: "sources"; sources: ChatSource[] }
    | { type: "done" }
    | { type: "error"; message: string };
}

export function AskAnimeshProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const open = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  return (
    <AskContext.Provider value={{ open }}>
      {children}
      {pathname !== "/ask" && !isOpen ? (
        <button
          className="ask-widget"
          type="button"
          onClick={open}
          aria-label="Open Ask Animesh chatbot"
          aria-haspopup="dialog"
          aria-expanded="false"
        >
          <span className="ask-widget-icon" aria-hidden="true">
            <ChatBubble />
            <Spark />
          </span>
          <span className="ask-widget-copy">
            <small>AI stand-in</small>
            <strong>Ask Animesh</strong>
          </span>
        </button>
      ) : null}
      {isOpen ? (
        <div className="ask-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) close();
        }}>
          <ChatExperience variant="drawer" onClose={close} />
        </div>
      ) : null}
    </AskContext.Provider>
  );
}

export function AskAnimeshLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(AskContext);
  return (
    <a
      className={className}
      href="/ask"
      onClick={(event) => {
        if (!context || event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        context.open();
      }}
    >
      {children}
    </a>
  );
}

export function ChatExperience({
  variant,
  onClose,
}: {
  variant: "drawer" | "page";
  onClose?: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [consent, setConsent] = useState<ConsentMode | null>(null);
  const [identity, setIdentity] = useState<ReturnType<typeof newIdentity> | null>(
    null,
  );
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (variant !== "drawer") return;
    const panel = dialogRef.current;
    if (!panel) return;
    panel.focus();
    document.body.classList.add("dialog-open");

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("dialog-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, variant]);

  useEffect(() => {
    if (consent) inputRef.current?.focus();
  }, [consent]);

  const chooseConsent = (mode: ConsentMode) => {
    const storage = mode === "persist_30d" ? localStorage : sessionStorage;
    const saved = storage.getItem(storageKey(mode));
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          identity: ReturnType<typeof newIdentity>;
          messages: UiMessage[];
        };
        const expired =
          mode === "persist_30d" &&
          Date.now() - parsed.identity.createdAt >= BROWSER_STORAGE_TTL_MS;
        if (expired) {
          storage.removeItem(storageKey(mode));
          setIdentity(newIdentity());
          setMessages([]);
        } else {
          setIdentity(parsed.identity);
          setMessages(parsed.messages ?? []);
        }
      } catch {
        setIdentity(newIdentity());
      }
    } else {
      setIdentity(newIdentity());
    }
    setConsent(mode);
  };

  useEffect(() => {
    if (!consent || !identity) return;
    const storage = consent === "persist_30d" ? localStorage : sessionStorage;
    storage.setItem(
      storageKey(consent),
      JSON.stringify({ identity, messages }),
    );
  }, [consent, identity, messages]);

  const submit = async (question = input) => {
    const text = question.trim();
    if (!text || !consent || !identity || isStreaming) return;
    const userMessage: UiMessage = {
      id: randomToken(9),
      role: "user",
      text: text.slice(0, 800),
    };
    const assistantId = randomToken(9);
    const nextMessages = [...messages, userMessage];
    setMessages([
      ...nextMessages,
      { id: assistantId, role: "assistant", text: "" },
    ]);
    setInput("");
    setError(null);
    setIsStreaming(true);
    setAnnouncement("AI stand-in is answering.");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...identity,
          consent,
          consentVersion: CONSENT_VERSION,
          messages: nextMessages
            .slice(-16)
            .map(({ role, text: messageText }) => ({
              role,
              text: messageText,
            })),
        }),
      });
      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";
        for (const chunk of chunks) {
          const event = parseSseChunk(chunk);
          if (!event) continue;
          if (event.type === "delta") {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? { ...message, text: message.text + event.text }
                  : message,
              ),
            );
          } else if (event.type === "sources") {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? { ...message, sources: event.sources }
                  : message,
              ),
            );
          } else if (event.type === "error") {
            throw new Error(event.message);
          }
        }
        if (done) break;
      }
      setAnnouncement("Answer complete.");
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "Something went wrong.";
      setError(message);
      setMessages((current) =>
        current.filter((item) => item.id !== assistantId || item.text),
      );
      setAnnouncement("The answer failed.");
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  const deleteSavedChat = async () => {
    if (!identity) return;
    setError(null);
    try {
      const response = await fetch("/api/chat/session", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(identity),
      });
      if (!response.ok && response.status !== 404) {
        throw new Error("Saved chat could not be deleted.");
      }
      localStorage.removeItem(storageKey("persist_30d"));
      setMessages([]);
      setIdentity(newIdentity());
      setAnnouncement("Saved chat deleted.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Delete failed.");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void submit();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submit();
    }
  };

  return (
    <section
      className={`ask-panel ask-panel-${variant}`}
      ref={dialogRef}
      role={variant === "drawer" ? "dialog" : undefined}
      aria-modal={variant === "drawer" ? true : undefined}
      aria-labelledby={titleId}
      tabIndex={variant === "drawer" ? -1 : undefined}
    >
      <header className="ask-panel-header">
        <div>
          <p className="eyebrow">AI stand-in · not Animesh live</p>
          <h1 id={titleId}>Ask Animesh</h1>
        </div>
        {variant === "drawer" ? (
          <button className="ask-close" type="button" onClick={onClose}>
            <span>Close</span> ×
          </button>
        ) : null}
      </header>

      {!consent ? (
        <div className="ask-consent">
          <span className="ask-consent-mark" aria-hidden="true">A.</span>
          <h2>Public facts. Straight answers.</h2>
          <p>
            This disclosed AI stand-in answers from approved information about
            my work and experience. Your requests are processed by OpenAI.
          </p>
          <div className="ask-consent-actions">
            <button type="button" onClick={() => chooseConsent("persist_30d")}>
              Continue and save for 30 days
            </button>
            <button
              className="ask-secondary-action"
              type="button"
              onClick={() => chooseConsent("no_store")}
            >
              Continue without saving
            </button>
          </div>
          <small>
            No-save keeps history only in this browser session. OpenAI response
            storage remains disabled in both modes.
          </small>
        </div>
      ) : (
        <div className="ask-conversation">
          <div className="ask-messages" aria-label="Conversation">
            {messages.length === 0 ? (
              <div className="ask-empty">
                <h2>Ask about the work.</h2>
                <p>
                  Projects, experience, technical decisions, current interests,
                  or the public version of how to reach me.
                </p>
                <div className="ask-suggestions">
                  {suggestedQuestions.map((question) => (
                    <button
                      type="button"
                      key={question}
                      onClick={() => void submit(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {messages.map((message) => (
              <article
                className={`ask-message ask-message-${message.role}`}
                key={message.id}
              >
                <span>{message.role === "user" ? "You" : "AI Animesh"}</span>
                <p>{message.text || <i>Thinking…</i>}</p>
                {message.sources?.length ? (
                  <div className="ask-sources" aria-label="Sources">
                    {message.sources.map((source) => (
                      <a
                        href={source.href}
                        key={source.id}
                        target={source.href.endsWith(".pdf") ? "_blank" : undefined}
                        rel={source.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                      >
                        {source.label} ↗
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <form className="ask-composer" onSubmit={handleSubmit}>
            <label htmlFor={`${titleId}-input`}>Your question</label>
            <textarea
              id={`${titleId}-input`}
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, 800))}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about my work, experience, or projects…"
              rows={3}
              maxLength={800}
              disabled={isStreaming}
            />
            <div>
              <span>{input.length}/800</span>
              <button type="submit" disabled={!input.trim() || isStreaming}>
                {isStreaming ? "Answering…" : "Send ↗"}
              </button>
            </div>
          </form>
          {error ? <p className="ask-error" role="alert">{error}</p> : null}
          <div className="ask-session-controls">
            <span>
              {consent === "persist_30d"
                ? "Saved for 30 days from the first message."
                : "Not saved by this site."}
            </span>
            {consent === "persist_30d" ? (
              <button type="button" onClick={() => void deleteSavedChat()}>
                Delete saved chat
              </button>
            ) : null}
          </div>
        </div>
      )}

      <footer className="ask-panel-footer">
        {variant === "drawer" ? <Link href="/ask">Open full page ↗</Link> : null}
        <span>Answers are limited to approved public sources.</span>
      </footer>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}
