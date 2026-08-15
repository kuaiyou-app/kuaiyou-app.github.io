"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { localizedHref, resolveDocsHashRedirect, routeForPath } from "@/lib/routes";

export default function LegacyLocaleRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams || searchParams.get("lang") !== "en") return;

    const remainingParams = new URLSearchParams(searchParams.toString());
    remainingParams.delete("lang");
    const query = remainingParams.toString();
    const currentRoute = routeForPath(pathname ?? "/");
    const redirected =
      currentRoute === "docs"
        ? resolveDocsHashRedirect(window.location.hash)
        : null;
    const targetRoute = redirected?.route ?? currentRoute;
    const targetHash = redirected?.hash ?? window.location.hash;
    const target = `${localizedHref("en", targetRoute)}${
      query ? `?${query}` : ""
    }${targetHash}`;

    router.replace(target, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
