import type { Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export type PublicRoute = "home" | "docs";

export const LOCALIZED_ROUTES = {
  zh: {
    home: "/",
    docs: "/docs/",
  },
  en: {
    home: "/en/",
    docs: "/en/docs/",
  },
} as const satisfies Record<Locale, Record<PublicRoute, string>>;

export const PUBLIC_LOCALES = ["zh", "en"] as const satisfies readonly Locale[];
export const PUBLIC_ROUTES = ["home", "docs"] as const satisfies readonly PublicRoute[];

export function localizedHref(
  locale: Locale,
  route: PublicRoute,
  hash?: string,
): string {
  const path = LOCALIZED_ROUTES[locale][route];
  if (!hash) return path;
  return `${path}${hash.startsWith("#") ? hash : `#${hash}`}`;
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
  return normalized === "/docs" || normalized === "/en/docs" ? "docs" : "home";
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return localizedHref(locale, routeForPath(pathname));
}
