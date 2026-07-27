"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "zh" | "en";

export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALE_STORAGE_KEY = "kuaiyou-locale";
export const LOCALE_QUERY_KEY = "lang";

type Dict = Record<string, string>;

const zh: Dict = {
  "meta.siteName": "快游大师 CLI",
  "meta.home.title": "快游大师 CLI — 用 AI 构建 Android 自动化技能",
  "meta.home.description":
    "快游大师 CLI（autoace-cli）：用 AI 理解 Android 界面，生成技能并下发到手机本地执行。",
  "meta.docs.title": "文档 — 安装与上手指南",
  "meta.docs.description":
    "了解如何安装 autoace-cli、连接 AI 客户端，并开始让 Agent 编写与运行技能。",
  "meta.notfound.title": "页面未找到",
  "skip.link": "跳到主要内容",
  "nav.primary": "主导航",
  "nav.brand": "快游大师 CLI",
  "nav.brandShort": "CLI",
  "nav.home": "首页",
  "nav.docs": "文档",
  "nav.getStarted": "快速开始",
  "nav.star": "Star GitHub",
  "nav.starAria": "在 GitHub 上 Star 本仓库",
  "nav.opensNewTab": "（在新标签页打开）",
  "lang.switch": "语言",
  "lang.zh": "中文",
  "lang.en": "EN",

  "home.badge": "快游大师 CLI · autoace-cli",
  "home.title.line1": "用 AI 构建",
  "home.title.line2": "Android 自动化技能",
  "home.subtitle":
    "电脑端 CLI（autoace-cli）让 AI 理解当前 Android 界面，生成技能并下发到手机本地执行。",
  "home.cta.primary": "快速开始 — 5 分钟上手",
  "home.cta.how": "了解工作原理",
  "home.cta.source": "查看源码",
  "home.boundary":
    "开源包含：电脑端 CLI（autoace-cli）、技能示例与文档。必需运行时：快游大师 App（应用商店可下载）。",
  "home.tags.aria": "产品约束",
  "home.tag.android": "Android系统",
  "home.tag.app": "快游大师自动化引擎",
  "home.tag.mcp": "官方开源 Skill 和 MCP",
  "home.tag.bridge": "局域网或 ADB",

  "home.how.title": "工作原理",
  "home.how.subtitle": "从 AI 理解界面，到手机本地执行自动化技能",
  "home.how.node1.title": "AI 客户端",
  "home.how.node1.desc": "理解任务并生成技能",
  "home.how.arrow1": "生成技能",
  "home.how.node2.title": "autoace-cli",
  "home.how.node2.desc": "读取界面、校验并下发",
  "home.how.arrow2": "下发到手机",
  "home.how.node3.title": "快游大师",
  "home.how.node3.desc": "确认后在手机本地执行",
  "home.how.sr":
    "AI 客户端通过 autoace-cli 读取 Android 界面、生成并校验技能，再下发到快游大师；用户确认后在手机本地执行。",

  "home.cap.title": "autoace-cli 能做什么",
  "home.cap.subtitle": "聚焦结果，而不是工具链细节",
  "home.cap.1.title": "看懂当前界面",
  "home.cap.1.desc":
    "让 AI 获取手机当前页面信息，基于真实界面生成自动化技能。",
  "home.cap.2.title": "生成技能",
  "home.cap.2.desc":
    "用结构化技能描述自动化流程，比固定坐标更易维护。",
  "home.cap.3.title": "下发前先校验",
  "home.cap.3.desc":
    "先检查技能是否合法，再下发到手机，减少无效调试。",
  "home.cap.4.title": "手机本地执行",
  "home.cap.4.desc":
    "技能在手机端确认后本地运行，不依赖运行中的外部模型。",

  "home.qs.title": "快速开始",
  "home.qs.subtitle": "五步开始你的第一个技能",
  "home.qs.1.strong": "安装快游大师",
  "home.qs.1.rest": "到 Android 手机，并完成基础权限设置。",
  "home.qs.2.strong": "开启 MCP 服务：",
  "home.qs.2.rest": "设置 → 高级设置，点击条目复制连接信息。",
  "home.qs.3.strong": "安装 CLI：",
  "home.qs.3.rest": "电脑需 Node.js ≥ 18，用 npm 安装或 npx 直接运行。",
  "home.qs.3.cmd": "npm install -g autoace-cli",
  "home.qs.3.alt": "或免安装：npx -y autoace-cli",
  "home.qs.4": "让 AI 查看当前界面，并开始生成技能。",
  "home.qs.5": "校验技能后下发到手机，并在手机上确认运行。",
  "home.qs.openGuide": "打开安装指南",
  "home.qs.installGuide": "CLI 安装说明",
  "home.qs.tools": "能力说明",

  "home.skills.title": "技能示例",
  "home.skills.subtitle":
    "浏览 {examples} 个示例与 {tests} 个兼容性测试技能。下载或复制后，校验并下发到手机运行。",

  "home.sec.title": "安全与边界",
  "home.sec.subtitle": "使用前需要了解的关键信息",
  "home.sec.1": "autoace-cli 运行在你的电脑本地。",
  "home.sec.2":
    "界面信息会在手机与本地工具之间传输；是否继续交给 AI，取决于你使用的客户端。",
  "home.sec.3": "导入前请审阅技能。手机端会在运行前要求确认。",
  "home.sec.4": "兼容 Cursor、Claude 等常见 AI 客户端。",
  "home.sec.5":
    "本仓库开源的是电脑端 CLI（autoace-cli）；手机端执行能力由快游大师提供，仍为闭源。",

  "skills.searchAria": "技能",
  "skills.filterAria": "技能分类",
  "skills.filter.all": "全部",
  "skills.filter.examples": "示例",
  "skills.filter.tests": "兼容性测试",
  "skills.searchLabel": "按名称、描述或 ID 搜索技能",
  "skills.searchPlaceholder": "按名称、描述或 ID 搜索…",
  "skills.result": "找到 {count} 个技能",
  "skills.howto.title": "如何运行技能",
  "skills.howto.1": "打开或下载技能文件。",
  "skills.howto.2.before": "用 AI 客户端",
  "skills.howto.2.after": "校验技能内容。",
  "skills.howto.3.before": "校验通过后",
  "skills.howto.3.after": "下发到手机。",
  "skills.howto.4": "在 Android 手机上确认并运行。",
  "skills.howto.note":
    "复制链接只是获取技能文件，不会自动部署。需要完成校验、下发和手机确认。",
  "skills.empty": "没有匹配“{query}”的技能。",
  "skills.category.examples": "示例",
  "skills.category.tests": "兼容性测试",
  "skills.viewJson": "查看技能",
  "skills.copyIdle": "复制链接",
  "skills.copyCopying": "复制中…",
  "skills.copySuccess": "已复制！",
  "skills.copyError": "复制失败",
  "skills.copyFallback": "剪贴板不可用。请手动复制此链接：",
  "skills.copyFallbackAria": "{id} 的技能链接",
  "skills.showMore": "查看更多",
  "skills.showLess": "收起",

  "docs.navAria": "文档导航",
  "docs.nav.intro": "简介",
  "docs.nav.names": "名称说明",
  "docs.nav.install": "安装 autoace-cli",
  "docs.nav.agentSkill": "安装 Agent Skill",
  "docs.nav.quick": "配置 MCP",
  "docs.nav.write": "写第一个技能",
  "docs.nav.tools": "核心能力",
  "docs.nav.boundaries": "开源说明",
  "docs.intro.title": "autoace 文档",
  "docs.intro.p1":
    "用 autoace-cli（MCP）连接手机，在 Claude Code / Codex / Cursor 等工具里用自然语言生成技能，校验后推送到快游大师本地执行。可选安装 Agent Skill「autoace」以固定工作流。",
  "docs.intro.note.strong": "说明：",
  "docs.intro.note":
    "开源：autoace-cli、Agent Skill（autoace）、文档与技能示例。快游大师 Android App 为闭源，且是端侧执行的必需依赖。",
  "docs.names.title": "名称说明",
  "docs.names.p": "先分清三个名字，避免装错东西：",
  "docs.names.cli": "电脑端 MCP CLI（npm 包名 / 命令）。开发联调必装。",
  "docs.names.agent":
    "Agent Skill（SKILL.md）。给 Claude Code / Codex / Cursor 的工作流说明；可选但推荐。",
  "docs.names.skillLabel": "技能",
  "docs.names.skill":
    "手机端执行的自动化 JSON。装在快游大师 App 里，不是装进 Claude/Codex 的文件。",
  "docs.install.title": "安装 autoace-cli",
  "docs.install.p":
    "autoace-cli 是电脑端 MCP 命令行工具（npm 包同名）。配置到 AI 客户端后，即可看屏、校验并推送技能。",
  "docs.install.npmLink": "在 npm 查看 autoace-cli →",
  "docs.install.req": "环境要求",
  "docs.install.req.1": "Node.js ≥ 18（建议 LTS）",
  "docs.install.req.2": "可访问 npm registry（或已配置可用镜像）",
  "docs.install.npx": "方式一：npx 免安装（推荐）",
  "docs.install.npx.desc":
    "不占用全局环境，每次使用已发布版本。适合作为各客户端的 MCP command：",
  "docs.install.global": "方式二：全局安装",
  "docs.install.global.desc":
    "安装后可直接使用命令 autoace-cli（同样可作为 MCP command）：",
  "docs.install.verify": "确认包可用",
  "docs.install.verify.desc": "查询 npm 上的当前版本：",
  "docs.install.tip.strong": "提示：",
  "docs.install.tip":
    "该命令是 MCP stdio 服务，在终端单独运行时会等待标准输入；正常用法是交给 AI 客户端拉起，并配置 KUAIYOU_DEVICE_IP / KUAIYOU_MCP_PAIRING_CODE。",
  "docs.agent.title": "安装 Agent Skill：autoace",
  "docs.agent.p":
    "Agent Skill「autoace」教 AI 如何用 MCP 写技能、校验、推送，以及 MCP 不可用时的 HTTP/ADB 回退。它不会把手机端技能 JSON 装进客户端。",
  "docs.agent.repoLink": "在 GitHub 查看 autoace →",
  "docs.agent.claude": "Claude Code",
  "docs.agent.claude.invoke":
    "个人目录可用；团队可放进项目 .claude/skills/autoace/。调用：/autoace。",
  "docs.agent.codex": "Codex",
  "docs.agent.codex.invoke":
    "也可放到项目 .agents/skills/autoace/。调用：$autoace 或 /skills。若未出现，确认 Codex 已启用 skills 并重启。",
  "docs.agent.cursor": "Cursor",
  "docs.agent.cursor.desc":
    "将 agent-skills/autoace 复制到项目或个人 Agent Skills 目录，新开 Agent 会话后即可按描述自动选用。",
  "docs.agent.npx": "通用安装（skills CLI）",
  "docs.quick.title": "配置 MCP 客户端",
  "docs.quick.p":
    "完成 autoace-cli 后，在手机开启 MCP 服务，把连接信息写入 AI 客户端。MCP server 名称建议使用 autoace。",
  "docs.quick.prereq": "1. 前置条件",
  "docs.quick.prereq.1": "已按上文可运行 autoace-cli（或使用 npx）",
  "docs.quick.prereq.2": "Android 手机上已安装快游大师 App",
  "docs.quick.prereq.3":
    "局域网模式：在 App「设置 → 高级设置」开启「MCP 服务」，点击条目复制连接信息（含 IP:端口 与配对码）。",
  "docs.quick.prereq.4": "USB 模式：通过数据线连接手机并开启 USB 调试。",
  "docs.quick.start": "2. 启动命令参考",
  "docs.quick.npm":
    "把 App 复制的环境变量填入启动命令（或写入 AI 客户端 MCP env）：",
  "docs.quick.lan":
    "局域网连接（推荐，替换为 App 显示的 IP:端口 与配对码）：",
  "docs.quick.usb": "USB / ADB 连接（无需 IP；可加 KUAIYOU_ADB_SERIAL）：",
  "docs.quick.connect": "3. MCP 配置示例（Cursor / Claude Desktop）",
  "docs.quick.claude": "在支持 MCP 的客户端中加入：",
  "docs.quick.clients": "其他客户端：",
  "docs.quick.clients.1":
    "Claude Code：在其 MCP 配置中增加同上 autoace 条目，重启会话后确认工具列表含 get_ui_tree / push_reactive_skill。",
  "docs.quick.clients.2":
    "Codex：在 ~/.codex/config.toml（或当前版本 MCP 配置处）注册同等 command / args / env。",
  "docs.quick.clients.3":
    "推荐同时安装 Agent Skill autoace，减少 Agent 走偏。",
  "docs.quick.compat":
    "文档只说明接入方式；各客户端菜单路径可能随版本变化。",
  "docs.write.title": "写第一个技能",
  "docs.write.lead":
    "用法：自然语言指挥 AI；AI 通过 autoace-cli MCP 看屏、编写技能、校验并推送。你一般不需要手写 JSON。",
  "docs.write.flow": "推荐流程",
  "docs.write.flow.1": "确认客户端已连接 autoace MCP，手机「MCP 服务」已开启；可选调用 /autoace。",
  "docs.write.flow.2": "在对话里粘贴下方提示词（或按你的目标改写）。",
  "docs.write.flow.3":
    "Agent 应先调用 get_ui_tree / capture_screenshot 了解当前界面。",
  "docs.write.flow.4":
    "再生成技能，用 validate_kuaiyou_skill 校验，然后 push_reactive_skill 推送到手机。",
  "docs.write.flow.5": "在手机上确认导入并运行；若不准确，继续用自然语言让 Agent 改一版再推。",
  "docs.write.prompt": "可直接粘贴给 Agent 的提示词",
  "docs.write.prompt.desc": "把下面整段发给已配置好 autoace MCP 的 AI：",
  "docs.write.prompt.sample":
    "请使用 autoace MCP：先 capture_screenshot 和 get_ui_tree 查看我现在的手机界面，再写一个技能：当出现「确认」按钮时点击它，最多 3 次、每次间隔约 2 秒。写完先 validate_kuaiyou_skill，通过后 push_reactive_skill 推送到手机。不要使用已移除的 readText / setClipboard，读写请用 storeValue。",
  "docs.write.prompt.more": "其他常用说法：",
  "docs.write.prompt.alt1":
    "看一下当前界面，帮我做一个自动点击「每日签到」的技能并推送到手机。",
  "docs.write.prompt.alt2":
    "刚才没点中，根据最新截图调整目标选择器后再推一版。",
  "docs.write.example": "Agent 可能生成的示例结构（参考）",
  "docs.write.example.desc":
    "下面只是技能 JSON 的形态示意；日常仍以 Agent 生成 + 校验为准。更多样例见仓库",
  "docs.write.example.end": "。仓库 examples/skills 是参考 JSON，不是 Agent Skill。",
  "docs.write.tip.strong": "提示：",
  "docs.write.tip":
    "手机端会在导入/运行前要求确认。技能动作必须是本地可执行的（tap、swipe、delay、storeValue 等）。",
  "docs.tools.title": "核心能力",
  "docs.tools.p": "autoace-cli 当前主要提供这些能力：",
  "docs.tools.1": "获取手机当前界面信息。",
  "docs.tools.2": "截取当前屏幕。",
  "docs.tools.3": "校验技能是否合法。",
  "docs.tools.4": "将技能下发到手机，确认后本地执行。",
  "docs.bound.title": "开源说明",
  "docs.bound.1":
    "开源：autoace-cli、Agent Skill（autoace）、文档、示例与技能 JSON。",
  "docs.bound.2": "闭源：快游大师 Android App / 手机端执行能力。",
  "docs.bound.3":
    "界面信息会经过你的本地工具。是否继续交给 AI，取决于你连接的客户端。",
  "docs.bound.4":
    "兼容 Claude Code、Codex、Cursor、Claude Desktop 等常见 AI 客户端。",

  "footer.brand": "快游大师 CLI",
  "footer.desc":
    "用 AI 构建 Android 自动化技能，并在手机本地执行。",
  "footer.nav": "页脚导航",
  "footer.github": "GitHub",
  "footer.docs": "文档",
  "footer.quick": "快速开始",
  "footer.skills": "技能示例",
  "footer.copy":
    "© {year} 快游大师团队。Apache-2.0 开源工具链。",
  "footer.note":
    "开源电脑端 CLI（autoace-cli）、文档与技能示例。快游大师 Android App 为闭源且为执行所必需。",

  "notfound.title": "页面未找到",
  "notfound.desc":
    "该路径不属于本站。请返回首页或查看安装指南。",
  "notfound.home": "返回首页",
  "notfound.docs": "打开快速开始",
};

const en: Dict = {
  "meta.siteName": "autoace-cli",
  "meta.home.title": "autoace-cli — Build Android automation skills with AI",
  "meta.home.description":
    "autoace-cli helps AI understand Android screens, create skills, and run them locally on your phone.",
  "meta.docs.title": "Docs — Install and get started",
  "meta.docs.description":
    "Learn how to install autoace-cli, connect an AI client, and let the agent build skills.",
  "meta.notfound.title": "Page not found",
  "skip.link": "Skip to main content",
  "nav.primary": "Primary",
  "nav.brand": "autoace-cli",
  "nav.brandShort": "CLI",
  "nav.home": "Home",
  "nav.docs": "Docs",
  "nav.getStarted": "Get started",
  "nav.star": "Star on GitHub",
  "nav.starAria": "Star on GitHub",
  "nav.opensNewTab": " (opens in a new tab)",
  "lang.switch": "Language",
  "lang.zh": "中文",
  "lang.en": "EN",

  "home.badge": "autoace-cli",
  "home.title.line1": "Build Android",
  "home.title.line2": "automation skills",
  "home.subtitle":
    "autoace-cli helps AI understand the current Android screen, create a skill, and run it locally on your phone.",
  "home.cta.primary": "Get started — 5 minute setup",
  "home.cta.how": "See how it works",
  "home.cta.source": "View source",
  "home.boundary":
    "Open source: autoace-cli, docs, and skill examples. Required runtime: Kuaiyou Master App (app stores).",
  "home.tags.aria": "Product constraints",
  "home.tag.android": "Android",
  "home.tag.app": "Kuaiyou Master automation engine",
  "home.tag.mcp": "Official open-source Skill & MCP",
  "home.tag.bridge": "LAN or ADB",

  "home.how.title": "How It Works",
  "home.how.subtitle":
    "From understanding a screen to running automation on your phone",
  "home.how.node1.title": "AI client",
  "home.how.node1.desc": "Understands the task and creates a skill",
  "home.how.arrow1": "Create skill",
  "home.how.node2.title": "autoace-cli",
  "home.how.node2.desc": "Reads the screen, validates, and sends",
  "home.how.arrow2": "Send to phone",
  "home.how.node3.title": "Kuaiyou Master",
  "home.how.node3.desc": "Confirm and run locally on device",
  "home.how.sr":
    "An AI client uses autoace-cli to understand the Android screen, create and validate a skill, then send it to Kuaiyou Master for local execution after confirmation.",

  "home.cap.title": "What you can do today",
  "home.cap.subtitle": "Focus on outcomes, not tool internals",
  "home.cap.1.title": "Understand the current screen",
  "home.cap.1.desc":
    "Let AI see what is on the phone before creating an automation skill.",
  "home.cap.2.title": "Create skills",
  "home.cap.2.desc":
    "Describe automation as structured skills that are easier to reuse than hard-coded coordinates.",
  "home.cap.3.title": "Validate before sending",
  "home.cap.3.desc":
    "Check the skill first, then send it to the phone to reduce failed runs.",
  "home.cap.4.title": "Run locally on the phone",
  "home.cap.4.desc":
    "After confirmation in Kuaiyou Master, the skill runs on-device without a live external model.",

  "home.qs.title": "Quick Start",
  "home.qs.subtitle": "Five steps to your first skill",
  "home.qs.1.strong": "Install Kuaiyou Master",
  "home.qs.1.rest": "on Android and finish basic permission setup.",
  "home.qs.2.strong": "Enable MCP Service:",
  "home.qs.2.rest":
    "Settings → Advanced, then tap the row to copy connection info.",
  "home.qs.3.strong": "Install the CLI:",
  "home.qs.3.rest": "Node.js ≥ 18 required; install via npm or run with npx.",
  "home.qs.3.cmd": "npm install -g autoace-cli",
  "home.qs.3.alt": "Or no install: npx -y autoace-cli",
  "home.qs.4": "Let AI inspect the current screen and start creating a skill.",
  "home.qs.5": "Validate the skill, send it to the phone, and confirm the run.",
  "home.qs.openGuide": "Open setup guide",
  "home.qs.installGuide": "CLI install guide",
  "home.qs.tools": "Capabilities",

  "home.skills.title": "Skill examples",
  "home.skills.subtitle":
    "Browse {examples} example and {tests} compatibility-test skills. Download or copy one, then validate and send it to the phone.",

  "home.sec.title": "Safety & boundaries",
  "home.sec.subtitle": "What you should know before using it",
  "home.sec.1": "autoace-cli runs locally on your computer.",
  "home.sec.2":
    "Screen information moves between the phone and local tooling; whether it is shared with AI depends on the client you use.",
  "home.sec.3":
    "Review each skill before import. The phone asks for confirmation before running.",
  "home.sec.4":
    "Works with common AI clients such as Cursor and Claude.",
  "home.sec.5":
    "This repository open-sources autoace-cli. On-device execution is provided by Kuaiyou Master and remains closed source.",

  "skills.searchAria": "技能",
  "skills.filterAria": "Skill category",
  "skills.filter.all": "All",
  "skills.filter.examples": "Examples",
  "skills.filter.tests": "Compatibility tests",
  "skills.searchLabel": "Search skills by name, description or ID",
  "skills.searchPlaceholder": "Search skills by name, description or ID...",
  "skills.result": "{count} skill(s) found",
  "skills.howto.title": "How to run a skill",
  "skills.howto.1": "Open or download the skill file.",
  "skills.howto.2.before": "Use your AI client to",
  "skills.howto.2.after": "validate the skill.",
  "skills.howto.3.before": "After validation,",
  "skills.howto.3.after": "send it to the phone.",
  "skills.howto.4": "Confirm and run it on Android.",
  "skills.howto.note":
    "Copying a link only gets the skill file. You still need validation, delivery, and phone confirmation.",
  "skills.empty": 'No skills found matching "{query}".',
  "skills.category.examples": "Example",
  "skills.category.tests": "Compatibility test",
  "skills.viewJson": "View skill",
  "skills.copyIdle": "Copy link",
  "skills.copyCopying": "Copying…",
  "skills.copySuccess": "Copied!",
  "skills.copyError": "Copy failed",
  "skills.copyFallback": "Clipboard access failed. Copy this link manually:",
  "skills.copyFallbackAria": "Skill link for {id}",
  "skills.showMore": "Show more",
  "skills.showLess": "Show less",

  "docs.navAria": "Documentation",
  "docs.nav.intro": "Introduction",
  "docs.nav.names": "Names",
  "docs.nav.install": "Install autoace-cli",
  "docs.nav.agentSkill": "Install Agent Skill",
  "docs.nav.quick": "Configure MCP",
  "docs.nav.write": "Write your first skill",
  "docs.nav.tools": "Core capabilities",
  "docs.nav.boundaries": "Open-source boundaries",
  "docs.intro.title": "autoace docs",
  "docs.intro.p1":
    "Use autoace-cli (MCP) with Claude Code, Codex, Cursor, and similar tools to create skills in natural language, validate them, and push them to Kuaiyou Master for local execution. Optionally install the Agent Skill named autoace.",
  "docs.intro.note.strong": "Note:",
  "docs.intro.note":
    "Open source: autoace-cli, Agent Skill (autoace), docs, and skill examples. The Kuaiyou Master Android App is closed source and required for on-device execution.",
  "docs.names.title": "Names",
  "docs.names.p": "Keep these three distinct:",
  "docs.names.cli": "Computer-side MCP CLI (npm package / command). Required for development.",
  "docs.names.agent":
    "Agent Skill (SKILL.md). Workflow instructions for Claude Code / Codex / Cursor. Optional but recommended.",
  "docs.names.skillLabel": "skill",
  "docs.names.skill":
    "Automation JSON that runs on the phone inside Kuaiyou Master — not a file you install into Claude/Codex.",
  "docs.install.title": "Install autoace-cli",
  "docs.install.p":
    "autoace-cli is the computer-side MCP CLI (same npm package name). Once wired into your AI client, it can see the screen, validate skills, and push them.",
  "docs.install.npmLink": "View autoace-cli on npm →",
  "docs.install.req": "Requirements",
  "docs.install.req.1": "Node.js ≥ 18 (LTS recommended)",
  "docs.install.req.2": "Access to the npm registry (or a working mirror)",
  "docs.install.npx": "Option 1: npx (no install, recommended)",
  "docs.install.npx.desc":
    "No global install. Uses the published package. Ideal as the MCP command in AI clients:",
  "docs.install.global": "Option 2: global install",
  "docs.install.global.desc":
    "After install you can run autoace-cli directly (also usable as the MCP command):",
  "docs.install.verify": "Confirm the package is available",
  "docs.install.verify.desc": "Check the version published on npm:",
  "docs.install.tip.strong": "Tip:",
  "docs.install.tip":
    "This binary is an MCP stdio server. Running it alone in a terminal waits on stdin. Normal use is letting your AI client launch it with KUAIYOU_DEVICE_IP / KUAIYOU_MCP_PAIRING_CODE.",
  "docs.agent.title": "Install Agent Skill: autoace",
  "docs.agent.p":
    "The Agent Skill autoace teaches the AI the MCP write → validate → push flow, plus HTTP/ADB fallback. It does not install phone-side skill JSON into the client.",
  "docs.agent.repoLink": "View autoace on GitHub →",
  "docs.agent.claude": "Claude Code",
  "docs.agent.claude.invoke":
    "Use the personal path above, or share via .claude/skills/autoace/ in a repo. Invoke with /autoace.",
  "docs.agent.codex": "Codex",
  "docs.agent.codex.invoke":
    "Or place under .agents/skills/autoace/ in a project. Invoke with $autoace or /skills. If missing, enable skills in Codex config and restart.",
  "docs.agent.cursor": "Cursor",
  "docs.agent.cursor.desc":
    "Copy agent-skills/autoace into your project or personal Agent Skills directory, then start a new Agent session.",
  "docs.agent.npx": "Generic install (skills CLI)",
  "docs.quick.title": "Configure MCP clients",
  "docs.quick.p":
    "After autoace-cli is available, enable MCP Service on the phone and put the connection info into your AI client. Prefer naming the MCP server autoace.",
  "docs.quick.prereq": "1. Prerequisites",
  "docs.quick.prereq.1": "autoace-cli runnable (or npx) as above",
  "docs.quick.prereq.2": "Kuaiyou Master installed on an Android phone",
  "docs.quick.prereq.3":
    "LAN mode: enable MCP Service under Settings → Advanced, then tap the row to copy connection info (IP:port + pairing code).",
  "docs.quick.prereq.4": "USB mode: connect the phone with a cable and enable USB debugging.",
  "docs.quick.start": "2. Launch command reference",
  "docs.quick.npm":
    "Put the env vars copied from the app into the start command (or into your AI client MCP env):",
  "docs.quick.lan":
    "LAN connection (recommended; replace with the IP:port and pairing code shown in the app):",
  "docs.quick.usb": "USB / ADB connection (no IP; optional KUAIYOU_ADB_SERIAL):",
  "docs.quick.connect": "3. MCP config example (Cursor / Claude Desktop)",
  "docs.quick.claude": "Add this to an MCP-capable client:",
  "docs.quick.clients": "Other clients:",
  "docs.quick.clients.1":
    "Claude Code: add the same autoace MCP entry, restart, and confirm tools like get_ui_tree / push_reactive_skill appear.",
  "docs.quick.clients.2":
    "Codex: register the same command / args / env in ~/.codex/config.toml (or the current Codex MCP settings).",
  "docs.quick.clients.3":
    "Also install the Agent Skill autoace so the agent stays on the intended workflow.",
  "docs.quick.compat":
    "These docs cover wiring only; exact menu paths vary by client version.",
  "docs.write.title": "Write your first skill",
  "docs.write.lead":
    "Drive it with natural language: the AI uses autoace-cli MCP to see the screen, write a skill, validate it, and push it. You usually should not hand-write JSON.",
  "docs.write.flow": "Recommended flow",
  "docs.write.flow.1":
    "Confirm the client is connected to autoace MCP and MCP Service is on; optionally run /autoace.",
  "docs.write.flow.2": "Paste one of the prompts below (or adapt it to your goal).",
  "docs.write.flow.3":
    "The agent should call get_ui_tree / capture_screenshot first to understand the screen.",
  "docs.write.flow.4":
    "Then it should write a skill, run validate_kuaiyou_skill, and push_reactive_skill to the phone.",
  "docs.write.flow.5":
    "Confirm import/run on the phone. If it misses, keep chatting so the agent revises and pushes again.",
  "docs.write.prompt": "Prompts you can paste to the agent",
  "docs.write.prompt.desc":
    "Send the following to an AI client that already has autoace MCP configured:",
  "docs.write.prompt.sample":
    "Use autoace MCP: first capture_screenshot and get_ui_tree to inspect my phone screen, then write a skill that taps the Confirm button whenever it appears, up to 3 times with about 2s between taps. Validate with validate_kuaiyou_skill, then push_reactive_skill. Do not use removed readText / setClipboard — use storeValue for read/write.",
  "docs.write.prompt.more": "Other useful phrasings:",
  "docs.write.prompt.alt1":
    "Look at the current screen, make a skill that taps Daily check-in, and push it to my phone.",
  "docs.write.prompt.alt2":
    "That miss-clicked — adjust the target from the latest screenshot and push another version.",
  "docs.write.example": "Example shape the agent may produce (reference)",
  "docs.write.example.desc":
    "This is only to illustrate skill JSON structure. Day-to-day, prefer agent generation + validation. More samples live under",
  "docs.write.example.end":
    ". Repo examples/skills are reference JSON, not the Agent Skill.",
  "docs.write.tip.strong": "Tip:",
  "docs.write.tip":
    "The phone asks for confirmation before import/run. Actions must be locally executable (tap, swipe, delay, storeValue, …).",
  "docs.tools.title": "Core capabilities",
  "docs.tools.p": "autoace-cli currently focuses on these outcomes:",
  "docs.tools.1": "Read the current phone screen context.",
  "docs.tools.2": "Capture the current screen.",
  "docs.tools.3": "Validate a skill.",
  "docs.tools.4": "Send a skill to the phone for local execution after confirmation.",
  "docs.bound.title": "Open-source boundaries",
  "docs.bound.1":
    "Open source: autoace-cli, Agent Skill (autoace), docs, examples, and skill JSON.",
  "docs.bound.2":
    "Closed source: Kuaiyou Master Android App / on-device execution.",
  "docs.bound.3":
    "Screen information passes through your local tooling. Whether it is shared with AI depends on the client you connect.",
  "docs.bound.4":
    "Works with Claude Code, Codex, Cursor, Claude Desktop, and similar clients.",

  "footer.brand": "autoace-cli",
  "footer.desc":
    "Build Android automation skills with AI and run them locally on your phone.",
  "footer.nav": "Footer",
  "footer.github": "GitHub",
  "footer.docs": "Documentation",
  "footer.quick": "Quick Start",
  "footer.skills": "Skill examples",
  "footer.copy":
    "© {year} Kuaiyou Master Team. Apache-2.0 open source tooling.",
  "footer.note":
    "Open-source autoace-cli, docs, and skill examples. The Kuaiyou Master Android App runtime is closed source and required for execution.",

  "notfound.title": "Page not found",
  "notfound.desc":
    "That route is not part of this site. Try the homepage or the setup guide.",
  "notfound.home": "Back to homepage",
  "notfound.docs": "Open Quick Start",
};

const dictionaries: Record<Locale, Dict> = { zh, en };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function format(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? `{${key}}` : String(vars[key])
  );
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "zh" || value === "en";
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(value)) return value;
  } catch {
    // ignore storage failures
  }
  return null;
}

function readQueryLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = new URLSearchParams(window.location.search).get(
      LOCALE_QUERY_KEY
    );
    if (isLocale(value)) return value;
  } catch {
    // ignore URL parsing failures
  }
  return null;
}

function writeLocaleToUrl(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    // Keep URLs clean for the default language.
    if (locale === DEFAULT_LOCALE) {
      url.searchParams.delete(LOCALE_QUERY_KEY);
    } else {
      url.searchParams.set(LOCALE_QUERY_KEY, locale);
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // ignore history failures
  }
}

function resolveDocumentMeta(locale: Locale, pathname: string) {
  const dict = dictionaries[locale] || dictionaries.zh;
  const fallback = dictionaries.zh;
  const isDocs =
    pathname === "/docs" ||
    pathname === "/docs/" ||
    pathname.endsWith("/docs") ||
    pathname.endsWith("/docs/");

  if (isDocs) {
    return {
      title: dict["meta.docs.title"] || fallback["meta.docs.title"],
      description:
        dict["meta.docs.description"] || fallback["meta.docs.description"],
    };
  }

  return {
    title: dict["meta.home.title"] || fallback["meta.home.title"],
    description:
      dict["meta.home.description"] || fallback["meta.home.description"],
  };
}

function applyDocumentMeta(locale: Locale) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";

  const { title, description } = resolveDocumentMeta(
    locale,
    window.location.pathname
  );
  document.title = title;

  const ensureMeta = (selector: string, attr: "name" | "property", key: string) => {
    let node = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attr, key);
      document.head.appendChild(node);
    }
    node.setAttribute("content", description);
  };

  ensureMeta('meta[name="description"]', "name", "description");
  ensureMeta('meta[property="og:description"]', "property", "og:description");
  ensureMeta('meta[name="twitter:description"]', "name", "twitter:description");

  const ogTitle = document.head.querySelector(
    'meta[property="og:title"]'
  ) as HTMLMetaElement | null;
  if (ogTitle) ogTitle.setAttribute("content", title);

  const twitterTitle = document.head.querySelector(
    'meta[name="twitter:title"]'
  ) as HTMLMetaElement | null;
  if (twitterTitle) twitterTitle.setAttribute("content", title);

  const ogLocale = document.head.querySelector(
    'meta[property="og:locale"]'
  ) as HTMLMetaElement | null;
  if (ogLocale) {
    ogLocale.setAttribute("content", locale === "zh" ? "zh_CN" : "en_US");
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // URL query wins over localStorage so shared links stay predictable.
    const fromQuery = readQueryLocale();
    const fromStorage = readStoredLocale();
    const initial = fromQuery || fromStorage || DEFAULT_LOCALE;
    setLocaleState(initial);
    writeLocaleToUrl(initial);
    applyDocumentMeta(initial);
  }, []);

  useEffect(() => {
    applyDocumentMeta(locale);
  }, [locale]);

  useEffect(() => {
    const onRouteMeta = () => applyDocumentMeta(locale);
    window.addEventListener("kuaiyou:route-meta", onRouteMeta);
    return () => window.removeEventListener("kuaiyou:route-meta", onRouteMeta);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore storage failures
    }
    writeLocaleToUrl(next);
    applyDocumentMeta(next);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale] || dictionaries.zh;
      const fallback = dictionaries.zh[key] || key;
      return format(dict[key] || fallback, vars);
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
