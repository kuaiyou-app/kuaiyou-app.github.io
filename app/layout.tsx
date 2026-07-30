import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocumentMeta from "@/components/DocumentMeta";
import { I18nProvider } from "@/lib/i18n";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "快游大师 CLI — 用 AI 构建 Android 自动化技能",
    template: "%s | 快游大师 CLI",
  },
  description:
    "快游大师 CLI（autoace-cli）：用 AI 理解 Android 界面，生成技能并下发到手机本地执行。",
  keywords: [
    "Android automation",
    "Android RPA",
    "AI Agent",
    "Model Context Protocol",
    "MCP",
    "autoace-cli",
    "LLM mobile testing",
    "安卓自动化测试",
    "快游大师",
    "Claude Code",
    "Cursor",
    "免 Root 自动化",
    "Zero-code UI testing",
    "如何用 AI 编写手机脚本",
    "如何用 AI 编写手机自动化",
    "手机端自动化工具"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "快游大师 CLI",
    title: "快游大师 CLI — 用 AI 构建 Android 自动化技能",
    description: "用 AI 理解 Android 界面，创建技能，并在手机本地执行。",
    locale: "zh_CN",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "快游大师 CLI — 用 AI 构建 Android 自动化技能",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "快游大师 CLI — 用 AI 构建 Android 自动化技能",
    description: "用 AI 构建 Android 自动化技能，并在手机本地执行。",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "快游大师 CLI (autoace-cli)",
    operatingSystem: "Windows, macOS, Linux (CLI)",
    applicationCategory: "DeveloperApplication",
    description: "基于 MCP 协议的安卓自动化引擎，让 Claude Code, Cursor 等 AI 工具免 Root 操控 Android 手机。",
    url: "https://kuaiyou-app.github.io"
  };

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* suppressHydrationWarning: I18nProvider may change lang on client
        based on localStorage/URL query, causing server-client mismatch. */}
        <I18nProvider>
          <DocumentMeta />
          <Navbar />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
