import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "autoace-cli",
  description: "AI and MCP tooling for Android automation.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootDocument({
  children,
  language,
}: {
  children: ReactNode;
  language: "zh-CN" | "en";
}) {
  return (
    <html lang={language}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
