import type { Metadata } from "next";
import DocsPageContent from "@/components/DocsPage";

export const metadata: Metadata = {
  title: "文档 — autoace-cli 与 Agent Skill",
  description:
    "安装 autoace-cli、Agent Skill（autoace），并在 Claude Code / Codex / Cursor 中配置 MCP、编写技能。",
  alternates: {
    canonical: "/docs/",
  },
};

export default function DocsPage() {
  return <DocsPageContent />;
}
