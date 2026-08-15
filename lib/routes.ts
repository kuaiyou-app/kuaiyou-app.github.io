import type { Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export type PublicRoute = "home" | "docs" | "tutorial";

export const LOCALIZED_ROUTES = {
  zh: {
    home: "/",
    docs: "/docs/",
    tutorial: "/docs/tutorial/",
  },
  en: {
    home: "/en/",
    docs: "/en/docs/",
    tutorial: "/en/docs/tutorial/",
  },
} as const satisfies Record<Locale, Record<PublicRoute, string>>;

export const PUBLIC_LOCALES = ["zh", "en"] as const satisfies readonly Locale[];
export const PUBLIC_ROUTES = ["home", "docs", "tutorial"] as const satisfies readonly PublicRoute[];

export function localizedHref(
  locale: Locale,
  route: PublicRoute,
  hash?: string,
): string {
  const path = LOCALIZED_ROUTES[locale][route];
  if (!hash) return path;
  return `${path}${hash.startsWith("#") ? hash : `#${hash}`}`;
}

/** Section ids that still live on the Quick Start docs page. */
const DOCS_PAGE_HASHES = new Set(["introduction", "quickstart"]);

/**
 * Old `/docs#…` ids after the General Tutorial split.
 * `agent-install` (paste-the-prompt) moved into Quick Start; the rest moved
 * to `/docs/tutorial#…` (some ids were renamed).
 */
const LEGACY_DOCS_HASH_REDIRECTS: Record<string, { route: PublicRoute; hash: string }> = {
  "agent-install": { route: "docs", hash: "#quickstart" },
  "app-install": { route: "tutorial", hash: "#app-install" },
  "install": { route: "tutorial", hash: "#install" },
  "agent-skill": { route: "tutorial", hash: "#agent-skill" },
  "mcp-config": { route: "tutorial", hash: "#client-pick" },
  "write-skill": { route: "tutorial", hash: "#workflow" },
  "mcp-tools": { route: "tutorial", hash: "#workflow" },
  tools: { route: "tutorial", hash: "#workflow" },
  boundaries: { route: "tutorial", hash: "#scenarios" },
  "client-pick": { route: "tutorial", hash: "#client-pick" },
  workflow: { route: "tutorial", hash: "#workflow" },
  scenarios: { route: "tutorial", hash: "#scenarios" },
  recovery: { route: "tutorial", hash: "#recovery" },
};

/** Where a `/docs` hash should go after the tutorial split. `null` = stay. */
export function resolveDocsHashRedirect(
  hash: string | undefined,
): { route: PublicRoute; hash: string } | null {
  const id = (hash ?? "").replace(/^#/, "");
  if (!id || DOCS_PAGE_HASHES.has(id)) return null;
  return LEGACY_DOCS_HASH_REDIRECTS[id] ?? null;
}

/** Backward-compatible alias for callers that prefer path terminology. */
export const localizedPath = localizedHref;

export function absoluteLocalizedUrl(locale: Locale, route: PublicRoute): string {
  return new URL(LOCALIZED_ROUTES[locale][route], SITE_URL).toString();
}

export function routeAlternates(route: PublicRoute) {
  return {
    "zh-CN": absoluteLocalizedUrl("zh", route),
    en: absoluteLocalizedUrl("en", route),
    "x-default": absoluteLocalizedUrl("zh", route),
  } as const;
}

export function localeForPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh";
}

export function routeForPath(pathname: string): PublicRoute {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/docs/tutorial" || normalized === "/en/docs/tutorial") {
    return "tutorial";
  }
  return normalized === "/docs" || normalized === "/en/docs" ? "docs" : "home";
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return localizedHref(locale, routeForPath(pathname));
}
