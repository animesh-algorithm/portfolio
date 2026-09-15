import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Animesh — Product-minded engineer",
  description: "A personal portfolio for products, experiments, and notes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
