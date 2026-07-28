# Kuaiyou Website

快游大师开源官网（Next.js 14 静态导出 → GitHub Pages）。

- **站点**：https://kuaiyou-app.github.io/
- **本仓**：https://github.com/kuaiyou-app/kuaiyou-website
- **核心生态仓**（MCP / schema / skills）：https://github.com/kuaiyou-app/kuaiyou-open-source

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

