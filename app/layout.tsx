import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Animesh — Engineer, product person, problem solver",
  description: "Animesh builds products, AI systems, and automation that solve hard, ambiguous problems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
