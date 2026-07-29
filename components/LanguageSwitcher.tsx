"use client";

import { useI18n, type I18nKey, type Locale } from "@/lib/i18n";
import styles from "./Navbar.module.css";
const OPTIONS: { id: Locale; labelKey: I18nKey }[] = [
  { id: "zh", labelKey: "lang.zh" },
  { id: "en", labelKey: "lang.en" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={styles['lang-switcher']}
      role="group"
      aria-label={t("lang.switch")}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`${styles['lang-btn']} ${locale === option.id ? styles.active : ""}`}
          aria-pressed={locale === option.id}
          onClick={() => setLocale(option.id)}
        >
          {t(option.labelKey)}
        </button>
      ))}
    </div>
  );
}
