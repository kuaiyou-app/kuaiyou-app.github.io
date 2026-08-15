import {
  absoluteLocalizedUrl,
  localeForPath,
  localizedHref,
  resolveDocsHashRedirect,
  routeAlternates,
  routeForPath,
  switchLocalePath,
} from "@/lib/routes";
import sitemap from "@/app/sitemap";

describe("localized routes", () => {
  it("maps every public page to a stable trailing-slash URL", () => {
    expect(localizedHref("zh", "home")).toBe("/");
    expect(localizedHref("zh", "docs")).toBe("/docs/");
    expect(localizedHref("zh", "tutorial")).toBe("/docs/tutorial/");
    expect(localizedHref("en", "home")).toBe("/en/");
    expect(localizedHref("en", "docs")).toBe("/en/docs/");
    expect(localizedHref("en", "tutorial")).toBe("/en/docs/tutorial/");
  });

  it("accepts hash fragments with or without a leading hash", () => {
    expect(localizedHref("en", "docs", "quickstart")).toBe(
      "/en/docs/#quickstart",
    );
    expect(localizedHref("zh", "tutorial", "#install")).toBe(
      "/docs/tutorial/#install",
    );
  });

  it("rewrites retired /docs hashes onto the tutorial page", () => {
    expect(resolveDocsHashRedirect("#introduction")).toBeNull();
    expect(resolveDocsHashRedirect("#quickstart")).toBeNull();
    expect(resolveDocsHashRedirect("")).toBeNull();
    expect(resolveDocsHashRedirect("#unknown")).toBeNull();
    expect(resolveDocsHashRedirect("#install")).toEqual({
      route: "tutorial",
      hash: "#install",
    });
    expect(resolveDocsHashRedirect("write-skill")).toEqual({
      route: "tutorial",
      hash: "#workflow",
    });
    expect(resolveDocsHashRedirect("#mcp-tools")).toEqual({
      route: "tutorial",
      hash: "#workflow",
    });
    expect(resolveDocsHashRedirect("#boundaries")).toEqual({
      route: "tutorial",
      hash: "#scenarios",
    });
    expect(resolveDocsHashRedirect("#agent-install")).toEqual({
      route: "docs",
      hash: "#quickstart",
    });
  });

  it("recognizes and switches equivalent localized pages", () => {
    expect(localeForPath("/en/docs/")).toBe("en");
    expect(localeForPath("/docs/")).toBe("zh");
    expect(routeForPath("/en/docs/")).toBe("docs");
    expect(routeForPath("/docs/tutorial/")).toBe("tutorial");
    expect(routeForPath("/en/docs/tutorial/")).toBe("tutorial");
    expect(switchLocalePath("/docs/", "en")).toBe("/en/docs/");
    expect(switchLocalePath("/docs/tutorial/", "en")).toBe("/en/docs/tutorial/");
    expect(switchLocalePath("/en/", "zh")).toBe("/");
  });

  it("builds absolute canonicals and complete language alternates", () => {
    expect(absoluteLocalizedUrl("en", "docs")).toBe(
      "https://kuaiyou-app.github.io/en/docs/",
    );
    expect(absoluteLocalizedUrl("en", "tutorial")).toBe(
      "https://kuaiyou-app.github.io/en/docs/tutorial/",
    );
    expect(routeAlternates("docs")).toEqual({
      "zh-CN": "https://kuaiyou-app.github.io/docs/",
      en: "https://kuaiyou-app.github.io/en/docs/",
      "x-default": "https://kuaiyou-app.github.io/docs/",
    });
  });

  it("lists all six localized pages in the sitemap", () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toEqual([
      "https://kuaiyou-app.github.io/",
      "https://kuaiyou-app.github.io/docs/",
      "https://kuaiyou-app.github.io/docs/tutorial/",
      "https://kuaiyou-app.github.io/en/",
      "https://kuaiyou-app.github.io/en/docs/",
      "https://kuaiyou-app.github.io/en/docs/tutorial/",
    ]);
    expect(entries.every((entry) => entry.alternates?.languages)).toBe(true);
  });
});
