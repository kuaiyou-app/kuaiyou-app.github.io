export const ANALYTICS_EVENTS = [
  "app_download",
  "docs_setup",
  "source_open",
  "npm_open",
  "config_copy",
  "skill_link_copy",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];
export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null
>;

export const ANALYTICS_CONSENT_KEY = "kuaiyou-analytics-consent";
export const ANALYTICS_CONSENT_GRANTED = "granted";

export function isAnalyticsEventName(
  value: string | null | undefined
): value is AnalyticsEventName {
  return ANALYTICS_EVENTS.includes(value as AnalyticsEventName);
}

function resolveEndpoint(value: string | undefined): string | null {
  const endpoint = value?.trim();
  if (!endpoint || typeof window === "undefined") return null;

  try {
    if (endpoint.startsWith("/")) {
      if (endpoint.startsWith("//")) return null;
      const url = new URL(endpoint, window.location.origin);
      return url.origin === window.location.origin ? url.toString() : null;
    }

    const url = new URL(endpoint);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function maySendAnalytics(): string | null {
  const endpoint = resolveEndpoint(
    process.env.NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT
  );
  const legacyWindowDnt = (window as Window & { doNotTrack?: string }).doNotTrack;
  const legacyMicrosoftDnt = (navigator as Navigator & { msDoNotTrack?: string })
    .msDoNotTrack;
  const dntEnabled = [navigator.doNotTrack, legacyWindowDnt, legacyMicrosoftDnt]
    .some((value) => value === "1" || value?.toLowerCase() === "yes");
  if (!endpoint || dntEnabled) return null;

  try {
    if (
      window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !==
      ANALYTICS_CONSENT_GRANTED
    ) {
      return null;
    }
  } catch {
    return null;
  }

  return endpoint;
}

export function trackEvent(
  name: AnalyticsEventName,
  properties: AnalyticsProperties = {}
): boolean {
  const endpoint = maySendAnalytics();
  if (!endpoint) return false;

  const body = JSON.stringify({
    name,
    properties,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  try {
    if (typeof navigator.sendBeacon === "function") {
      const queued = navigator.sendBeacon(
        endpoint,
        new Blob([body], { type: "application/json" })
      );
      if (queued) return true;
    }

    void fetch(endpoint, {
      method: "POST",
      body,
      headers: { "content-type": "application/json" },
      keepalive: true,
      credentials: "same-origin",
    }).catch(() => undefined);
    return true;
  } catch {
    return false;
  }
}
