import type { Metadata } from "next";
import DocsPageContent from "@/components/DocsPage";

export const metadata: Metadata = {
  title: "文档 — 安装与上手指南",
  description:
    "了解如何安装 autoace-cli、连接 AI 客户端，并开始让 Agent 编写与运行技能。",
  alternates: {
    canonical: "/docs/",
  },
};

export default function DocsPage() {
  return <DocsPageContent />;
}
