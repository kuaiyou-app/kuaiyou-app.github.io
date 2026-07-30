"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { APP_DOWNLOAD_URL, CORE_REPO_URL, BILIBILI_URL } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { localizedHref } from "@/lib/routes";
import styles from "./Navbar.module.css";

const MOBILE_MENU_ID = "primary-navigation-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const homeHref = localizedHref(locale, "home");
  const docsHref = localizedHref(locale, "docs");
  const isDocs = pathname === docsHref || pathname === docsHref.replace(/\/$/, "");
  const isHome = !isDocs;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <nav className={`${styles.navbar} glass-panel`} aria-label={t("nav.primary")}>
      <div className={styles['nav-container']}>
        <Link href={homeHref} className={styles['nav-brand']}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={t("nav.brand")} className={styles['logo-icon']} width={28} height={28} />
          <span className={styles['nav-logo-text']} aria-hidden="true">
            <span className={styles['nav-logo-full']}>{t("nav.brand")}</span>
            <span className={styles['nav-logo-short']}>{t("nav.brandShort")}</span>
          </span>
        </Link>

        <div
          id={MOBILE_MENU_ID}
          className={`${styles['nav-links']} ${menuOpen ? styles['nav-links-open'] : ""}`}
        >
          <Link
            href={homeHref}
            className={`${styles['nav-link']} ${isHome ? styles.active : ""}`}
            aria-current={isHome ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.home")}
          </Link>
          <Link
            href={docsHref}
            className={`${styles['nav-link']} ${isDocs ? styles.active : ""}`}
            aria-current={isDocs ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.docs")}
          </Link>
        </div>

        <div className={styles['nav-actions']}>
          <LanguageSwitcher />
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['nav-app-btn']}
            data-analytics-event="app_download"
            data-analytics-label="navbar"
          >
            {t("home.cta.primary")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <a
            href={CORE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['github-btn']}
            aria-label={t("nav.starAria")}
            data-analytics-event="source_open"
            data-analytics-label="navbar"
          >
            <span className={styles['github-icon']} aria-hidden="true">
              ⭐
            </span>
            <span className={styles['github-btn-label']}>{t("nav.star")}</span>
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <a
            href={BILIBILI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['github-btn']}
            aria-label={t("nav.bilibiliAria")}
          >
            <span className={styles['github-icon']} aria-hidden="true" style={{ color: '#00aeec' }}>
              📺
            </span>
            <span className={styles['github-btn-label']}>{t("nav.bilibili")}</span>
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <button
            type="button"
            className={styles['hamburger']}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            <span className={styles['hamburger-line']} />
            <span className={styles['hamburger-line']} />
            <span className={styles['hamburger-line']} />
          </button>
        </div>
      </div>
    </nav>
  );
}
