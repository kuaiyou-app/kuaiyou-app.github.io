"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import homeStyles from "@/components/HomePage.module.css";
import skillStyles from "@/components/SkillCard.module.css";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main id="main-content" className={`${homeStyles.container} animate-fade-in ${skillStyles['not-found']}`}>
      <div className={`glass-panel ${skillStyles['not-found-panel']}`}>
        <p className={`${homeStyles['hero-badge']} code-font`}>404</p>
        <h1>{t("notfound.title")}</h1>
        <p>{t("notfound.desc")}</p>
        <div className={homeStyles['hero-actions']}>
          <Link href="/" className="btn btn-primary">
            {t("notfound.home")}
          </Link>
          <Link href="/docs#quick-start" className="btn btn-secondary">
            {t("notfound.docs")}
          </Link>
        </div>
      </div>
    </main>
  );
}
