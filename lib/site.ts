/** Shared site constants for the static GitHub Pages export. */

/** Org Pages serve at the root; no base path (repo: kuaiyou-app.github.io). */
export const SITE_BASE_PATH = "";

export const SITE_ORIGIN = "https://kuaiyou-app.github.io";

export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;

export const GITHUB_REPO_URL = "https://github.com/kuaiyou-app/kuaiyou-app.github.io";

/** Canonical MCP / schema / skills monorepo. */
export const CORE_REPO_URL = "https://github.com/kuaiyou-app/kuaiyou-open-source";

/** Official Bilibili Account */
export const BILIBILI_URL = "https://space.bilibili.com/3706945288538928";

/** Official Kuaiyou Master product/download and compliance pages. */
export const APP_PRODUCT_URL = "https://autoace.kuaiyou-app.com";
export const APP_DOWNLOAD_URL = `${APP_PRODUCT_URL}/download`;
export const PRIVACY_POLICY_URL = `${APP_PRODUCT_URL}/privacy-policy`;
export const USER_AGREEMENT_URL = `${APP_PRODUCT_URL}/user-agreement`;

/** Public issue tracker for usage questions and reproducible toolchain bugs. */
export const SUPPORT_URL = `${CORE_REPO_URL}/issues`;
export const SECURITY_URL = `${GITHUB_REPO_URL}/security/advisories/new`;

/** Published MCP CLI on npm. */
export const NPM_PACKAGE_URL = "https://www.npmjs.com/package/autoace-cli";
export const NPM_PACKAGE_NAME = "autoace-cli";

/** Agent Skill name (Claude Code / Codex / Cursor). Distinct from phone-side 技能 JSON. */
export const AGENT_SKILL_NAME = "autoace";

/** Immutable kuaiyou-open-source v1.0.1 commit; update deliberately with a release. */
export const AGENT_SKILL_COMMIT =
  "d0acaccc42945c6df49b640d4bd6647546a22bf5";

export const AGENT_SKILL_RAW_URL =
  `https://raw.githubusercontent.com/kuaiyou-app/kuaiyou-open-source/${AGENT_SKILL_COMMIT}/agent-skills/autoace/SKILL.md`;

export const AGENT_SKILL_SOURCE_URL =
  `${CORE_REPO_URL}/tree/${AGENT_SKILL_COMMIT}/agent-skills/autoace`;

export const AGENT_SKILL_PAGES_URL = `${SITE_URL}/agent-skills/autoace/SKILL.md`;

export const SKILLS_PUBLIC_PATH = `${SITE_BASE_PATH}/skills`;
