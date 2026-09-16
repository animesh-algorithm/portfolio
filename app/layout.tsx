import type { Metadata } from "next";
import { AskAnimeshProvider } from "@/components/ask-animesh";
import "./globals.css";

export const metadata: Metadata = {
  title: "Animesh — Engineer, product person, problem solver",
  description: "Animesh builds products, AI systems, and automation that solve hard, ambiguous problems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AskAnimeshProvider>{children}</AskAnimeshProvider>
      </body>
    </html>
  );
}
