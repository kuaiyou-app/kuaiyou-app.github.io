"use client";

import Link from "next/link";
import {
  APP_DOWNLOAD_URL,
  BILIBILI_URL,
  CORE_REPO_URL,
  PRIVACY_POLICY_URL,
  SECURITY_URL,
  SUPPORT_URL,
} from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { localizedHref } from "@/lib/routes";
import styles from "./Footer.module.css";

export default function Footer() {
  const { locale, t } = useI18n();

  return (
    <footer className={`${styles.footer} glass-panel`}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-brand']}>
          <span className={styles['footer-logo-text']}>{t("footer.brand")}</span>
          <p className={styles['footer-desc']}>{t("footer.desc")}</p>
        </div>
        <nav className={styles['footer-links']} aria-label={t("footer.nav")}>
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="app_download"
            data-analytics-label="footer"
          >
            {t("footer.app")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <a
            href={CORE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="source_open"
            data-analytics-label="footer"
          >
            {t("footer.github")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <a href={BILIBILI_URL} target="_blank" rel="noopener noreferrer">
            {t("nav.bilibili")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <Link href={localizedHref(locale, "docs")}>{t("footer.docs")}</Link>
          <Link
            href={localizedHref(locale, "docs", "agent-install")}
            data-analytics-event="docs_setup"
            data-analytics-label="footer"
          >
            {t("footer.quick")}
          </Link>
          <Link href={localizedHref(locale, "home", "skills")}>{t("footer.skills")}</Link>
          <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer">
            {t("footer.privacy")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <a href={SECURITY_URL} target="_blank" rel="noopener noreferrer">
            {t("footer.security")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
            {t("footer.support")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
        </nav>
      </div>
      <div className={styles['footer-bottom']}>
        <p>{t("footer.copy", { year: new Date().getFullYear() })}</p>
        <p>{t("footer.note")}</p>
      </div>
    </footer>
  );
}
