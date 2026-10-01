# 安全策略 (Security Policy)

**请不要在公开的 GitHub Issue 中报告安全漏洞。**

本仓库为纯静态导出站点（无服务端逻辑）。`autoace-cli`、Agent Skill、技能库相关漏洞请通过核心仓库的私密安全公告提交：
https://github.com/kuaiyou-app/kuaiyou-open-source/security/advisories/new

仅涉及本站点本身（页面内容、构建与部署流程）的问题，请提交到本仓库：
https://github.com/kuaiyou-app/kuaiyou-app.github.io/security/advisories/new

## 已知且接受的依赖审计告警

本站固定在 Next.js 14.2.x（见 `CLAUDE.md`）。`npm audit` 对 `next` 及其传递依赖的告警主要针对 Next 服务端（middleware、图片优化、Server Actions 等）。本站以 `output: "export"` 生成纯静态 HTML 部署到 GitHub Pages，生产环境不运行 Next 服务端，这些告警不适用于线上攻击面。我们会跟进 14.2.x 补丁版本，但不会仅为清理告警升级大版本。
