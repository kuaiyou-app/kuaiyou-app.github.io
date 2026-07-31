import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";
import {
  absoluteLocalizedUrl,
  LOCALIZED_ROUTES,
  routeAlternates,
  type PublicRoute,
} from "@/lib/routes";
import {
  CORE_REPO_URL,
  SITE_URL,
} from "@/lib/site";

type SeoCopy = {
  siteName: string;
  title: string;
  description: string;
  imageAlt: string;
};

const SEO_COPY: Record<Locale, Record<PublicRoute, SeoCopy>> = {
  zh: {
    home: {
      siteName: "快游大师 CLI",
      title: "快游大师 CLI — The Agentic Skills｜用 AI 编写 Android 端侧自动化技能",
      description:
        "The Agentic Skills：用 AI 编写 Android 端侧自动化技能（MCP + 快游大师）。连接 AI 客户端看屏、校验并下发技能；手机确认后本地执行。",
      imageAlt: "The Agentic Skills：用 AI 编写 Android 端侧自动化技能",
    },
    docs: {
      siteName: "快游大师 CLI",
      title: "文档 — 通过 AI Agent 安装并配置 MCP",
      description:
        "用可复制提示词安装 autoace-cli 与 Agent Skill，配置 MCP，开始用 AI 编写 Android 端侧自动化技能。",
      imageAlt: "快游大师 CLI 安装与配置文档",
    },
  },
  en: {
    home: {
      siteName: "autoace-cli",
      title: "autoace-cli — The Agentic Skills | Write Android on-device automation skills with AI",
      description:
        "The Agentic Skills: write Android on-device automation skills with AI (MCP + Kuaiyou Master). Connect AI clients to inspect, validate, and push skills; confirm on the phone, then run locally.",
      imageAlt: "The Agentic Skills: write Android on-device automation skills with AI",
    },
    docs: {
      siteName: "autoace-cli",
      title: "Docs — Install via AI Agent and configure MCP",
      description:
        "Paste a prompt to install autoace-cli and the Agent Skill, configure MCP, then write Android on-device automation skills with AI.",
      imageAlt: "autoace-cli installation and setup documentation",
    },
  },
};

const OG_IMAGE = `${SITE_URL}/og-image-product.png`;

const SEO_KEYWORDS: Record<Locale, Record<PublicRoute, string[]>> = {
  zh: {
    home: [
      "Android 自动化",
      "AI 自动化测试",
      "手机自动化",
      "MCP 工具",
      "autoace-cli",
      "快游大师",
    ],
    docs: [
      "autoace-cli 安装",
      "Android MCP",
      "Claude Code Android",
      "Codex Android 自动化",
      "Cursor MCP 配置",
    ],
  },
  en: {
    home: [
      "Android automation",
      "AI mobile testing",
      "MCP Android tools",
      "autoace-cli",
      "Kuaiyou Master",
    ],
    docs: [
      "install autoace-cli",
      "Android MCP setup",
      "Claude Code Android automation",
      "Codex Android automation",
      "Cursor MCP config",
    ],
  },
};

export function createPageMetadata(
  locale: Locale,
  route: PublicRoute,
): Metadata {
  const copy = SEO_COPY[locale][route];
  const canonical = LOCALIZED_ROUTES[locale][route];
  const url = absoluteLocalizedUrl(locale, route);
  const languages = routeAlternates(route);

  return {
    title: { absolute: copy.title },
    description: copy.description,
    keywords: SEO_KEYWORDS[locale][route],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: route === "docs" ? "article" : "website",
      url,
      siteName: copy.siteName,
      title: copy.title,
      description: copy.description,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: [locale === "zh" ? "en_US" : "zh_CN"],
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: copy.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [OG_IMAGE],
    },
  };
}

export function createHomeJsonLd(locale: Locale) {
  const copy = SEO_COPY[locale].home;
  const url = absoluteLocalizedUrl(locale, "home");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: locale === "zh" ? "快游大师" : "Kuaiyou Master",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [CORE_REPO_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: copy.siteName,
        description: copy.description,
        inLanguage: locale === "zh" ? "zh-CN" : "en",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: "autoace-cli",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Windows, macOS, Linux",
        description: copy.description,
        url,
        codeRepository: CORE_REPO_URL,
        inLanguage: locale === "zh" ? "zh-CN" : "en",
        author: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export function createDocsJsonLd(locale: Locale) {
  const copy = SEO_COPY[locale].docs;
  const homeUrl = absoluteLocalizedUrl(locale, "home");
  const docsUrl = absoluteLocalizedUrl(locale, "docs");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${docsUrl}#article`,
        headline: copy.title,
        description: copy.description,
        url: docsUrl,
        mainEntityOfPage: docsUrl,
        inLanguage: locale === "zh" ? "zh-CN" : "en",
        author: {
          "@type": "Organization",
          name: locale === "zh" ? "快游大师" : "Kuaiyou Master",
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "zh" ? "首页" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "zh" ? "文档" : "Docs",
            item: docsUrl,
          },
        ],
      },
    ],
  };
}

/** Serialize JSON-LD without allowing a value to terminate the script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
