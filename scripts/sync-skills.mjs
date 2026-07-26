#!/usr/bin/env node
/**
 * Sync skill JSON into public/skills before Next build/dev.
 *
 * Source resolution (first hit wins):
 * 1. KUAIYOU_SKILLS_DIR
 * 2. ../kuaiyou-open-source/skills (local sibling monorepo)
 * 3. ./_skills_src/skills (CI checkout of the core repo)
 * 4. Existing public/skills (standalone vendored snapshot — no-op success)
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = join(__dirname, "..");
const targetDir = join(websiteRoot, "public", "skills");

const candidates = [
  process.env.KUAIYOU_SKILLS_DIR,
  join(websiteRoot, "..", "kuaiyou-open-source", "skills"),
  join(websiteRoot, "_skills_src", "skills"),
].filter(Boolean);

function listJson(dir) {
  return readdirSync(dir).filter((f) => f.endsWith(".json"));
}

let sourceDir = null;
for (const dir of candidates) {
  if (existsSync(dir) && listJson(dir).length > 0) {
    sourceDir = dir;
    break;
  }
}

if (!sourceDir) {
  if (existsSync(targetDir) && listJson(targetDir).length > 0) {
    console.log(
      `[sync-skills] no external source; keeping vendored public/skills (${listJson(targetDir).length} files)`
    );
    process.exit(0);
  }
  console.error(
    "[sync-skills] no skills source found. Set KUAIYOU_SKILLS_DIR, clone kuaiyou-open-source as a sibling, or vendor JSON under public/skills."
  );
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });

for (const name of readdirSync(targetDir)) {
  if (name.endsWith(".json")) {
    rmSync(join(targetDir, name), { force: true });
  }
}

const files = listJson(sourceDir);
for (const file of files) {
  cpSync(join(sourceDir, file), join(targetDir, file));
}

console.log(
  `[sync-skills] synced ${files.length} skill JSON file(s) from ${sourceDir} → public/skills`
);
