"use client";

import { useEffect } from "react";

import { isAnalyticsEventName, trackEvent } from "@/lib/analytics";

export default function AnalyticsBridge() {
  useEffect(() => {
    const trackDeclarativeClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const element = event.target.closest<HTMLElement>(
        "[data-analytics-event]"
      );
      const name = element?.dataset.analyticsEvent;
      if (!element || !isAnalyticsEventName(name)) return;

      const label = element.dataset.analyticsLabel;
      trackEvent(name, label ? { label } : {});
    };

    document.addEventListener("click", trackDeclarativeClick);
    return () => document.removeEventListener("click", trackDeclarativeClick);
  }, []);

  return null;
}
