#!/usr/bin/env node
/**
 * Verify the zh/en locale dictionaries contain exactly the same key set.
 * Runs in CI so a missing translation fails the build instead of shipping
 * raw keys or fallback text to the page.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = join(__dirname, "..", "lib", "locales");

const zh = JSON.parse(readFileSync(join(localesDir, "zh.json"), "utf-8"));
const en = JSON.parse(readFileSync(join(localesDir, "en.json"), "utf-8"));

const zhKeys = new Set(Object.keys(zh));
const enKeys = new Set(Object.keys(en));

const missingInEn = [...zhKeys].filter((k) => !enKeys.has(k));
const missingInZh = [...enKeys].filter((k) => !zhKeys.has(k));

let failed = false;
for (const key of missingInEn) {
  console.error(`[check-i18n] missing in en.json: ${key}`);
  failed = true;
}
for (const key of missingInZh) {
  console.error(`[check-i18n] missing in zh.json: ${key}`);
  failed = true;
}

// Values that are identical across languages are usually copy-paste mistakes
// (brand names and proper nouns excepted).
const ALLOWED_IDENTICAL = new Set(["lang.zh", "lang.en"]);
for (const key of zhKeys) {
  if (!enKeys.has(key) || ALLOWED_IDENTICAL.has(key)) continue;
  if (zh[key] === en[key] && /[一-鿿]/.test(zh[key])) {
    console.error(`[check-i18n] en.json value still Chinese for key: ${key}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`[check-i18n] OK: ${zhKeys.size} keys in sync between zh/en`);
