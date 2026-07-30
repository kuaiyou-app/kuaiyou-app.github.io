import {
  absoluteLocalizedUrl,
  localeForPath,
  localizedHref,
  routeAlternates,
  routeForPath,
  switchLocalePath,
} from "@/lib/routes";
import sitemap from "@/app/sitemap";

describe("localized routes", () => {
  it("maps every public page to a stable trailing-slash URL", () => {
    expect(localizedHref("zh", "home")).toBe("/");
    expect(localizedHref("zh", "docs")).toBe("/docs/");
    expect(localizedHref("en", "home")).toBe("/en/");
    expect(localizedHref("en", "docs")).toBe("/en/docs/");
  });

  it("accepts hash fragments with or without a leading hash", () => {
    expect(localizedHref("en", "docs", "install")).toBe(
      "/en/docs/#install",
    );
    expect(localizedHref("zh", "docs", "#install")).toBe(
      "/docs/#install",
    );
  });

  it("recognizes and switches equivalent localized pages", () => {
    expect(localeForPath("/en/docs/")).toBe("en");
    expect(localeForPath("/docs/")).toBe("zh");
    expect(routeForPath("/en/docs/")).toBe("docs");
    expect(switchLocalePath("/docs/", "en")).toBe("/en/docs/");
    expect(switchLocalePath("/en/", "zh")).toBe("/");
  });

  it("builds absolute canonicals and complete language alternates", () => {
    expect(absoluteLocalizedUrl("en", "docs")).toBe(
      "https://kuaiyou-app.github.io/en/docs/",
    );
    expect(routeAlternates("docs")).toEqual({
      "zh-CN": "https://kuaiyou-app.github.io/docs/",
      en: "https://kuaiyou-app.github.io/en/docs/",
      "x-default": "https://kuaiyou-app.github.io/docs/",
    });
  });

  it("lists all four localized pages in the sitemap", () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toEqual([
      "https://kuaiyou-app.github.io/",
      "https://kuaiyou-app.github.io/docs/",
      "https://kuaiyou-app.github.io/en/",
      "https://kuaiyou-app.github.io/en/docs/",
    ]);
    expect(entries.every((entry) => entry.alternates?.languages)).toBe(true);
  });
});
