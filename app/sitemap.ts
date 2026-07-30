import type { MetadataRoute } from "next";
import {
  absoluteLocalizedUrl,
  PUBLIC_LOCALES,
  PUBLIC_ROUTES,
  routeAlternates,
} from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_LOCALES.flatMap((locale) =>
    PUBLIC_ROUTES.map((route) => ({
      url: absoluteLocalizedUrl(locale, route),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "home" ? 1 : 0.8,
      alternates: {
        languages: routeAlternates(route),
      },
    })),
  );
}
