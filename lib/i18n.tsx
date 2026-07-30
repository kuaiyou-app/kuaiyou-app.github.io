"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import zhDict from "./locales/zh.json";
import enDict from "./locales/en.json";

export type Locale = "zh" | "en";

export const DEFAULT_LOCALE: Locale = "zh";
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
export function I18nProvider({
  children,
  locale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  locale?: Locale;
}) {

  const t = useCallback(
    (key: I18nKey, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale] || dictionaries.zh;
      const fallback = dictionaries.zh[key] || key;
      return format(dict[key] || fallback, vars);
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, t }),
    [locale, t]
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
