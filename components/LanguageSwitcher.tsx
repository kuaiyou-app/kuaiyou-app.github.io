"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, type I18nKey, type Locale } from "@/lib/i18n";
import { localizedHref, routeForPath } from "@/lib/routes";
import styles from "./Navbar.module.css";

const OPTIONS: { id: Locale; labelKey: I18nKey }[] = [
  { id: "zh", labelKey: "lang.zh" },
  { id: "en", labelKey: "lang.en" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const page = routeForPath(pathname ?? "/");

  return (
    <div
      className={styles['lang-switcher']}
      role="group"
      aria-label={t("lang.switch")}
    >
      {OPTIONS.map((option) => (
        <Link
          key={option.id}
          href={localizedHref(option.id, page)}
          className={`${styles['lang-btn']} ${locale === option.id ? styles.active : ""}`}
          hrefLang={option.id === "zh" ? "zh-CN" : "en"}
          lang={option.id === "zh" ? "zh-CN" : "en"}
          aria-current={locale === option.id ? "page" : undefined}
        >
          {t(option.labelKey)}
        </Link>
      ))}
    </div>
  );
}
