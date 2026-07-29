"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CORE_REPO_URL } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const isHome = pathname === "/" || pathname === "";
  const isDocs = pathname === "/docs" || pathname === "/docs/";

  return (
    <nav className="navbar glass-panel" aria-label={t("nav.primary")}>
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Logo" className="logo-icon" width={28} height={28} style={{ borderRadius: '4px' }} />
          <span className="nav-logo-text">
            <span className="nav-logo-full">{t("nav.brand")}</span>
            <span className="nav-logo-short">{t("nav.brandShort")}</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${isHome ? "active" : ""}`}
            aria-current={isHome ? "page" : undefined}
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/docs"
            className={`nav-link ${isDocs ? "active" : ""}`}
            aria-current={isDocs ? "page" : undefined}
          >
            {t("nav.docs")}
          </Link>
        </div>

        <div className="nav-actions">
          <LanguageSwitcher />
          <Link href="/docs#install" className="nav-docs-btn">
            <span className="nav-docs-btn-full">{t("nav.getStarted")}</span>
            <span className="nav-docs-btn-short">{t("nav.docs")}</span>
          </Link>
          <a
            href={CORE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
            aria-label={t("nav.starAria")}
          >
            <span className="github-icon" aria-hidden="true">
              ⭐
            </span>
            <span className="github-btn-label">{t("nav.star")}</span>
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
