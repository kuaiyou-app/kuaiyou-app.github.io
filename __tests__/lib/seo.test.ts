import {
  createDocsJsonLd,
  createHomeJsonLd,
  createPageMetadata,
  createTutorialJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

describe("static SEO", () => {
  it("creates locale-specific canonical, alternate, and social metadata", () => {
    expect(createPageMetadata("en", "docs")).toMatchObject({
      title: {
        absolute: "Docs — Install via AI Agent and configure MCP",
      },
      alternates: {
        canonical: "/en/docs/",
        languages: {
          "zh-CN": "https://kuaiyou-app.github.io/docs/",
          en: "https://kuaiyou-app.github.io/en/docs/",
          "x-default": "https://kuaiyou-app.github.io/docs/",
        },
      },
      openGraph: {
        type: "article",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
      },
    });

    expect(createPageMetadata("zh", "home")).toMatchObject({
      alternates: { canonical: "/" },
      openGraph: { type: "website", locale: "zh_CN" },
    });

    expect(createPageMetadata("en", "tutorial")).toMatchObject({
      alternates: {
        canonical: "/en/docs/tutorial/",
        languages: {
          "zh-CN": "https://kuaiyou-app.github.io/docs/tutorial/",
          en: "https://kuaiyou-app.github.io/en/docs/tutorial/",
          "x-default": "https://kuaiyou-app.github.io/docs/tutorial/",
        },
      },
      openGraph: { type: "article" },
    });
  });

  it("emits the required page-specific schema graphs", () => {
    expect(createHomeJsonLd("en")["@graph"].map((node) => node["@type"]))
      .toEqual(["Organization", "WebSite", "SoftwareApplication"]);
    expect(createDocsJsonLd("zh")["@graph"].map((node) => node["@type"]))
      .toEqual(["TechArticle", "BreadcrumbList"]);
    expect(createTutorialJsonLd("zh")["@graph"].map((node) => node["@type"]))
      .toEqual(["TechArticle", "BreadcrumbList"]);
  });

  it("escapes values that could close a JSON-LD script element", () => {
    const serialized = serializeJsonLd({ value: "</script><script>alert(1)</script>" });

    expect(serialized).not.toContain("<");
    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)).toEqual({
      value: "</script><script>alert(1)</script>",
    });
  });
});
