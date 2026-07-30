import { fireEvent, render } from "@testing-library/react";

import AnalyticsBridge from "@/components/AnalyticsBridge";
import {
  ANALYTICS_CONSENT_KEY,
  isAnalyticsEventName,
  trackEvent,
} from "@/lib/analytics";

describe("analytics", () => {
  const sendBeacon = vi.fn<(url: string | URL, data?: BodyInit | null) => boolean>(
    () => true
  );
  const fetchMock = vi.fn(() => Promise.resolve(new Response()));

  beforeEach(() => {
    localStorage.clear();
    vi.unstubAllEnvs();
    sendBeacon.mockClear();
    fetchMock.mockClear();
    Object.defineProperty(navigator, "sendBeacon", {
      configurable: true,
      value: sendBeacon,
    });
    Object.defineProperty(navigator, "doNotTrack", {
      configurable: true,
      value: "0",
    });
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("recognizes only centralized event names", () => {
    expect(isAnalyticsEventName("app_download")).toBe(true);
    expect(isAnalyticsEventName("unregistered_event")).toBe(false);
  });

  it("does nothing by default without an endpoint", () => {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");

    expect(trackEvent("app_download")).toBe(false);
    expect(sendBeacon).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires explicit granted consent", () => {
    vi.stubEnv("NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT", "/collect");

    expect(trackEvent("docs_setup")).toBe(false);
    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it("honors Do Not Track", () => {
    vi.stubEnv("NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT", "/collect");
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
    Object.defineProperty(navigator, "doNotTrack", {
      configurable: true,
      value: "1",
    });

    expect(trackEvent("source_open")).toBe(false);
    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it("honors legacy Do Not Track values", () => {
    vi.stubEnv("NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT", "/collect");
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
    Object.defineProperty(window, "doNotTrack", {
      configurable: true,
      value: "yes",
    });

    expect(trackEvent("source_open")).toBe(false);
    expect(sendBeacon).not.toHaveBeenCalled();

    Reflect.deleteProperty(window, "doNotTrack");
  });

  it.each([
    "http://analytics.example/collect",
    "//analytics.example/collect",
    "/\\analytics.example/collect",
    "collect",
  ])(
    "rejects unsafe endpoint %s",
    (endpoint) => {
      vi.stubEnv("NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT", endpoint);
      localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");

      expect(trackEvent("npm_open")).toBe(false);
      expect(sendBeacon).not.toHaveBeenCalled();
    }
  );

  it("sends consented events to a same-origin endpoint", () => {
    vi.stubEnv("NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT", "/collect");
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");

    expect(trackEvent("config_copy", { location: "docs" })).toBe(true);
    expect(sendBeacon).toHaveBeenCalledOnce();
    expect(sendBeacon.mock.calls[0][0]).toBe(
      new URL("/collect", window.location.origin).toString()
    );
  });

  it("accepts configured HTTPS endpoints", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT",
      "https://analytics.example/collect"
    );
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");

    expect(trackEvent("skill_link_copy")).toBe(true);
    expect(sendBeacon).toHaveBeenCalledWith(
      "https://analytics.example/collect",
      expect.any(Blob)
    );
  });

  it("delegates registered data-analytics-event clicks", () => {
    vi.stubEnv("NEXT_PUBLIC_KUAIYOU_ANALYTICS_ENDPOINT", "/collect");
    localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
    const view = render(
      <>
        <AnalyticsBridge />
        <button data-analytics-event="app_download"><span>Download</span></button>
        <button data-analytics-event="unknown">Unknown</button>
      </>
    );

    fireEvent.click(view.getByText("Download"));
    fireEvent.click(view.getByText("Unknown"));

    expect(sendBeacon).toHaveBeenCalledOnce();
  });
});
