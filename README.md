# Kuaiyou Website

快游大师开源官网（Next.js 14 静态导出 → GitHub Pages）。

- **站点**：https://kuaiyou-app.github.io/
- **Android App**：https://autoace.kuaiyou-app.com/download
- **本仓**：https://github.com/kuaiyou-app/kuaiyou-app.github.io
- **核心生态仓**（MCP / schema / skills）：https://github.com/kuaiyou-app/kuaiyou-open-source

公开页面采用静态多语言路由：中文 `/`、`/docs/`，英文 `/en/`、`/en/docs/`。旧的 `?lang=en` 链接会跳转到对应英文路径。

面向 AI Agent 的安装指南：[`/autoace-cli-installation-guide.md`](https://kuaiyou-app.github.io/autoace-cli-installation-guide.md)。

推荐安装 Agent Skill：

```bash
npx -y skills add kuaiyou-app/kuaiyou-open-source --skill autoace -g -y
```

### MCP 工具目录排查

若 `autoace-cli` 直连 stdio 的 `tools/list` 已含某工具（如 `pair_device`），但 Cursor / 其他客户端的 **Agent 会话**工具目录没有：多为会话缓存未刷新，不是 CLI 未注册。请新开 Agent 对话或重启 MCP 后再验。

## Stack pin (do not major-upgrade)

- **Pinned:** Next.js **14.2.x** (`output: 'export'` for GitHub Pages).
- **WON'T DO:** upgrading to Next.js 15/16 solely for dependency hygiene or generic CVE cleanup.
- See [`CLAUDE.md`](./CLAUDE.md).

## Local development

```bash
npm ci
npm run sync-skills   # optional if public/skills already vendored
npm run dev
```

Open http://localhost:3000/

## Privacy-first analytics

网站默认不发送分析请求。只有同时满足以下条件时，受控 CTA 事件才会发送：

1. 设置 `NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT` 为同源相对路径或 HTTPS 地址；
2. 用户已明确同意，并在 localStorage 写入 `kuaiyou-analytics-consent=granted`；
3. 浏览器未启用 Do Not Track。

当前仅记录预定义事件名、页面路径、时间和站内定义的按钮标签，不采集输入内容。项目暂未提供同意弹窗，因此生产环境在接入合规同意管理前保持零请求。

### Skills source

Canonical skills live in `kuaiyou-open-source`. This site vendors a snapshot under `public/skills` and refreshes it when possible:

| Priority | Source |
| --- | --- |
| 1 | `KUAIYOU_SKILLS_DIR` |
| 2 | Sibling `../kuaiyou-open-source/skills` |
| 3 | CI checkout `_skills_src/skills` |
| 4 | Existing `public/skills` |

## Deploy

Push to `main` runs GitHub Pages deploy (`.github/workflows/pages.yml`).
Enable **Settings → Pages → Source: GitHub Actions** on the repo.
