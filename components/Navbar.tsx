"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CORE_REPO_URL } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const isHome = pathname === "/" || pathname === "";
  const isDocs = pathname === "/docs" || pathname === "/docs/";

  return (
    <nav className={`${styles.navbar} glass-panel`} aria-label={t("nav.primary")}>
      <div className={styles['nav-container']}>
        <Link href="/" className={styles['nav-brand']}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Logo" className={styles['logo-icon']} width={28} height={28} style={{ borderRadius: '4px' }} />
          <span className={styles['nav-logo-text']}>
            <span className={styles['nav-logo-full']}>{t("nav.brand")}</span>
            <span className={styles['nav-logo-short']}>{t("nav.brandShort")}</span>
          </span>
        </Link>

        <div className={styles['nav-links']}>
          <Link
            href="/"
            className={`${styles['nav-link']} ${isHome ? styles.active : ""}`}
            aria-current={isHome ? "page" : undefined}
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/docs"
            className={`${styles['nav-link']} ${isDocs ? styles.active : ""}`}
            aria-current={isDocs ? "page" : undefined}
          >
            {t("nav.docs")}
          </Link>
        </div>

        <div className={styles['nav-actions']}>
          <LanguageSwitcher />
          <Link href="/docs#install" className={styles['nav-docs-btn']}>
            <span className={styles['nav-docs-btn-full']}>{t("nav.getStarted")}</span>
            <span className={styles['nav-docs-btn-short']}>{t("nav.docs")}</span>
          </Link>
          <a
            href={CORE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['github-btn']}
            aria-label={t("nav.starAria")}
          >
            <span className={styles['github-icon']} aria-hidden="true">
              ⭐
            </span>
            <span className={styles['github-btn-label']}>{t("nav.star")}</span>
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
