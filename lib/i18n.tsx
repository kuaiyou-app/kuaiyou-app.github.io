"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import zhDict from "./locales/zh.json";
import enDict from "./locales/en.json";

export type Locale = "zh" | "en";

export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALE_STORAGE_KEY = "kuaiyou-locale";
export const LOCALE_QUERY_KEY = "lang";

type Dict = Record<keyof typeof zhDict, string>;

/** All valid translation keys. t() only accepts these, so missing keys fail typecheck. */
export type I18nKey = keyof typeof zhDict;

// enDict must contain every key of zhDict (enforced by the Dict type above).
const zh: Dict = zhDict;
const en: Dict = enDict;
const dictionaries: Record<Locale, Dict> = { zh, en };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: I18nKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function format(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? `{${key}}` : String(vars[key])
  );
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "zh" || value === "en";
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(value)) return value;
  } catch {
    // ignore storage failures
  }
  return null;
}

function readQueryLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = new URLSearchParams(window.location.search).get(
      LOCALE_QUERY_KEY
    );
    if (isLocale(value)) return value;
  } catch {
    // ignore URL parsing failures
  }
  return null;
}

function writeLocaleToUrl(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    // Keep URLs clean for the default language.
    if (locale === DEFAULT_LOCALE) {
      url.searchParams.delete(LOCALE_QUERY_KEY);
    } else {
      url.searchParams.set(LOCALE_QUERY_KEY, locale);
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // ignore history failures
  }
}

function resolveDocumentMeta(locale: Locale, pathname: string) {
  const dict = dictionaries[locale] || dictionaries.zh;
  const fallback = dictionaries.zh;
  const isDocs =
    pathname === "/docs" ||
    pathname === "/docs/" ||
    pathname.endsWith("/docs") ||
    pathname.endsWith("/docs/");

  if (isDocs) {
    return {
      title: dict["meta.docs.title"] || fallback["meta.docs.title"],
      description:
        dict["meta.docs.description"] || fallback["meta.docs.description"],
    };
  }

  return {
    title: dict["meta.home.title"] || fallback["meta.home.title"],
    description:
      dict["meta.home.description"] || fallback["meta.home.description"],
  };
}

function applyDocumentMeta(locale: Locale) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";

  const { title, description } = resolveDocumentMeta(
    locale,
    window.location.pathname
  );
  document.title = title;

  const ensureMeta = (selector: string, attr: "name" | "property", key: string) => {
    let node = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attr, key);
      document.head.appendChild(node);
    }
    node.setAttribute("content", description);
  };

  ensureMeta('meta[name="description"]', "name", "description");
  ensureMeta('meta[property="og:description"]', "property", "og:description");
  ensureMeta('meta[name="twitter:description"]', "name", "twitter:description");

  const ogTitle = document.head.querySelector(
    'meta[property="og:title"]'
  ) as HTMLMetaElement | null;
  if (ogTitle) ogTitle.setAttribute("content", title);

  const twitterTitle = document.head.querySelector(
    'meta[name="twitter:title"]'
  ) as HTMLMetaElement | null;
  if (twitterTitle) twitterTitle.setAttribute("content", title);

  const ogLocale = document.head.querySelector(
    'meta[property="og:locale"]'
  ) as HTMLMetaElement | null;
  if (ogLocale) {
    ogLocale.setAttribute("content", locale === "zh" ? "zh_CN" : "en_US");
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    // URL query wins over localStorage so shared links stay predictable.
    const fromQuery = readQueryLocale();
    const fromStorage = readStoredLocale();
    const initial = fromQuery || fromStorage || DEFAULT_LOCALE;
    setLocaleState(initial);
    writeLocaleToUrl(initial);
    applyDocumentMeta(initial);
  }, []);

  useEffect(() => {
    applyDocumentMeta(locale);
  }, [locale]);

  useEffect(() => {
    const onRouteMeta = () => applyDocumentMeta(locale);
    window.addEventListener("kuaiyou:route-meta", onRouteMeta);
    return () => window.removeEventListener("kuaiyou:route-meta", onRouteMeta);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore storage failures
    }
    writeLocaleToUrl(next);
    applyDocumentMeta(next);
  }, []);

  const t = useCallback(
    (key: I18nKey, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale] || dictionaries.zh;
      const fallback = dictionaries.zh[key] || key;
      return format(dict[key] || fallback, vars);
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
