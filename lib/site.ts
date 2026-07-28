/** Shared site constants for the static GitHub Pages export. */

/** Org Pages serve at the root; no base path (repo: kuaiyou-app.github.io). */
export const SITE_BASE_PATH = "";

export const SITE_ORIGIN = "https://kuaiyou-app.github.io";

export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;

export const GITHUB_REPO_URL = "https://github.com/kuaiyou-app/kuaiyou-app.github.io";

/** Canonical MCP / schema / skills monorepo. */
export const CORE_REPO_URL = "https://github.com/kuaiyou-app/kuaiyou-open-source";

/** Published MCP CLI on npm. */
export const NPM_PACKAGE_URL = "https://www.npmjs.com/package/autoace-cli";
export const NPM_PACKAGE_NAME = "autoace-cli";

/** Agent Skill name (Claude Code / Codex / Cursor). Distinct from phone-side 技能 JSON. */
export const AGENT_SKILL_NAME = "autoace";

export const AGENT_SKILL_RAW_URL =
  "https://raw.githubusercontent.com/kuaiyou-app/kuaiyou-open-source/main/agent-skills/autoace/SKILL.md";

export const AGENT_SKILL_PAGES_URL = `${SITE_URL}/agent-skills/autoace/SKILL.md`;

export const SKILLS_PUBLIC_PATH = `${SITE_BASE_PATH}/skills`;
