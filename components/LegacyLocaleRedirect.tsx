"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { localizedHref, routeForPath } from "@/lib/routes";

export default function LegacyLocaleRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams || searchParams.get("lang") !== "en") return;

    const remainingParams = new URLSearchParams(searchParams.toString());
    remainingParams.delete("lang");
    const query = remainingParams.toString();
    const target = `${localizedHref("en", routeForPath(pathname ?? "/"))}${
      query ? `?${query}` : ""
    }${window.location.hash}`;

    router.replace(target, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
