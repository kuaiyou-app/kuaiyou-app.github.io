# Kuaiyou Website — agent notes

## Deferred decisions (do not re-open unless explicitly asked)

### Next.js 14 → 16 upgrade — **WON'T DO**

- **Decision (2026-07-17):** Keep this site on **Next.js 14.2.x**. Do **not** upgrade to 15.x or 16.x.
- **Do not** put this on repair roadmaps, ROI plans, security sprints, or Dependabot-driven upgrade proposals.
- **Do not** treat “fix Next dependency vulnerabilities” as a reason to major-upgrade Next for this site.

**Why (stable rationale):**

1. The site is **`output: 'export'` static HTML on GitHub Pages** — no Next Node server in production. Typical Next server/middleware/image-optimizer CVEs do not apply to the deployed attack surface.
2. The app surface is tiny (App Router, `/` + `/docs`, `next/link` + `next/font/local`, no middleware/API/Server Actions/`next/image`).
3. Cost is real (React 19, drop `next lint`, Node ≥ 20.9 for Next 16, Pages `out/` + `basePath` regression) while product ROI is on **MCP server + skills schema**, not the marketing site.

**Allowed follow-ups (only if asked):**

- Patch-level bumps **within 14.2.x** if a real 14-line CVE lands and a patch exists.
- Revisit major upgrade only if product requirements change (SSR, auth middleware, non-static hosting) **or** the user explicitly requests it.
- Org-root Pages (`kuaiyou-app.github.io`) by renaming this repo and clearing `basePath` — only when asked.

### Related pinned stack

- Primary Node: `.nvmrc` → 20; engines allow ≥18.17 for Next 14.
- Skills content is owned by `kuaiyou-app/kuaiyou-open-source`; this repo vendors / syncs for display only.
