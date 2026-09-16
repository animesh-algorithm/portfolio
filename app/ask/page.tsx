import { ChatExperience } from "@/components/ask-animesh";
import Link from "next/link";

export const metadata = {
  title: "Ask Animesh — AI stand-in",
  description:
    "Ask a disclosed AI stand-in about Animesh's approved public work and experience.",
};

export default function AskPage() {
  return (
    <main className="ask-page">
      <nav className="ask-page-nav shell" aria-label="Back to portfolio">
        <Link href="/">← Back to portfolio</Link>
      </nav>
      <ChatExperience variant="page" />
    </main>
  );
}
