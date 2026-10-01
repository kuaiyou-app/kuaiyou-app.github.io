import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import {
  absoluteLocalizedUrl,
  PUBLIC_LOCALES,
  PUBLIC_ROUTES,
  routeAlternates,
} from "@/lib/routes";

/**
 * Last commit time of the content behind the pages. Using the build time made
 * every scheduled deploy (twice a day) look like a content change to crawlers.
 */
function contentLastModified(): Date | undefined {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", "components", "lib/locales", "app"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    // Shallow or missing git checkout: omit lastmod rather than invent one.
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = contentLastModified();
  return PUBLIC_LOCALES.flatMap((locale) =>
    PUBLIC_ROUTES.map((route) => ({
      url: absoluteLocalizedUrl(locale, route),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly" as const,
      priority: route === "home" ? 1 : 0.8,
      alternates: {
        languages: routeAlternates(route),
      },
    })),
  );
}
