"use client";

import Link from "next/link";
import { CORE_REPO_URL } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className={`${styles.footer} glass-panel`}>
      <div className={styles['footer-content']}>
        <div className={styles['footer-brand']}>
          <span className={styles['footer-logo-text']}>{t("footer.brand")}</span>
          <p className={styles['footer-desc']}>{t("footer.desc")}</p>
        </div>
        <nav className={styles['footer-links']} aria-label={t("footer.nav")}>
          <a href={CORE_REPO_URL} target="_blank" rel="noopener noreferrer">
            {t("footer.github")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <Link href="/docs">{t("footer.docs")}</Link>
          <Link href="/docs#install">{t("footer.quick")}</Link>
          <Link href="/#skills">{t("footer.skills")}</Link>
        </nav>
      </div>
      <div className={styles['footer-bottom']}>
        <p>{t("footer.copy", { year: new Date().getFullYear() })}</p>
        <p>{t("footer.note")}</p>
      </div>
    </footer>
  );
}
