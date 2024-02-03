import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from "@/lib/providers/next-theme-providers";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Animesh Sharma • Software Developer, Web & Mobile • Data Scientist • Portfolio",
  description:
    "Animesh Sharma • Software Developer, Web & Mobile • Data Scientist • Portfolio",
  icons: {
    icon: "https://dev.animesharma3.com/icon.jpeg",
    apple: "https://dev.animesharma3.com/icon.jpeg",
    shortcut: "https://dev.animesharma3.com/icon.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@animesh-algorithm",
    creator: "@animesh-algorithm",
    description:
      "Animesh Sharma • Software Developer, Web & Mobile • Data Scientist • Portfolio",
    images: [
      "https://dev.animesharma3.com/icon.jpeg",
      "https://dev.animesharma3.com/favicon.ico",
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev.animesharma3.com",
    siteName:
      "Animesh Sharma • Software Developer, Web & Mobile • Data Scientist • Portfolio",
    title:
      "Animesh Sharma • Software Developer, Web & Mobile • Data Scientist • Portfolio",
    description:
      "Animesh Sharma • Software Developer, Web & Mobile • Data Scientist • Portfolio",
    images: [
      {
        url: "https://dev.animesharma3.com/icon.jpeg",
        width: 800,
        height: 600,
        alt: "Animesh Sharma • Software Developer, Web & Mobile • Data Scientist • Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge("bg-background", font.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
