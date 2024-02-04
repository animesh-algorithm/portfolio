import React, { useEffect, useRef } from "react";
import { Message, useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Bot, SendHorizontal, Trash, XCircle } from "lucide-react";
import { Card } from "../ui/card";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Input } from "../ui/input";
import Image from "next/image";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "bottom-12 right-0 z-50 w-full max-w-[500px] p-1 md:right-[60px]",
        open ? "fixed" : "hidden"
      )}
    >
      <Card className="flex h-[585px] flex-col rounded border bg-background shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                content:
                  "This error occured because currently I'm on free teir of Netlify and it has some limitations.",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex flex-col h-full items-center justify-center gap-3 text-center mx-8">
              <Image src="/icon.png" alt="AI Chat" width={200} height={200} />
              <p className="text-washed-purple-100">
                Send a message to start the AI chat!
              </p>
              <p className="text-washed-blue-200">
                You can ask the chatbot any question about me and it will find
                the relevant information on this website.
              </p>
              <p className="text-sm text-washed-blue-300">
                Example: "What are your projects?" or "Tell me more about
                yourself."
              </p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button
            variant="ghost"
            onClick={() => setMessages([])}
            type="button"
            title="Clear Chat"
          >
            <Trash size={20} />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="grow border rounded bg-background px-3 py-2"
            ref={inputRef}
          />
          <Button
            variant="ghost"
            type="submit"
            className="disabled:opacity-50"
            disabled={input.length === 0}
            title="Submit message"
          >
            <SendHorizontal size={20} />
          </Button>
        </form>
      </Card>
    </div>
  );
};

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAIMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAIMessage ? "me-5 justify-start" : "ms-5 justify-end"
      )}
    >
      {isAIMessage && (
        <Image
          src="/icon.png"
          alt="AI Chat"
          width={40}
          height={40}
          className="mr-2 flex-none"
        />
      )}
      <div
        className={cn(
          "rounded-md border px-3 py-2",
          isAIMessage
            ? "bg-brand-dark"
            : "dark:bg-gradient-to-r dark:to-brand-primaryBlue dark:from-brand-primaryPurple"
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                className="hover:underline"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default AIChatBox;
