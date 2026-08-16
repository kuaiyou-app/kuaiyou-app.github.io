"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import {
  DOC_NAV_TOP_ITEMS,
  DOC_NAV_TUTORIAL_ITEMS,
  isNavLink,
} from "@/lib/docs-nav";
import { useI18n, type Locale } from "@/lib/i18n";
import { localizedHref, resolveDocsHashRedirect } from "@/lib/routes";
import styles from "./DocsPage.module.css";

export default function DocsPageContent({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const redirected = resolveDocsHashRedirect(window.location.hash);
    if (redirected) {
      router.replace(localizedHref(locale, redirected.route, redirected.hash));
      return;
    }
    if (window.location.hash) {
      setActiveSection(window.location.hash.slice(1));
    }
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -70% 0px" }
    );

    DOC_NAV_TOP_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [locale, router]);

  return (
    <main
      id="main-content"
      data-locale={locale}
      className={`${styles['docs-container']}`}
    >
      <nav className={`${styles['docs-sidebar']} glass-panel`} aria-label={t("docs.navAria")}>
        <ul className={styles['docs-nav']}>
          <li className={styles['docs-nav-group']} aria-hidden="true">
            {t("docs.nav.quickStartGroup")}
          </li>
          {DOC_NAV_TOP_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={activeSection === item.id ? styles.active : undefined}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={() => setActiveSection(item.id)}
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
          <li className={styles['docs-nav-group']} aria-hidden="true">
            {t("docs.nav.tutorialGroup")}
          </li>
          {DOC_NAV_TUTORIAL_ITEMS.map((item) =>
            isNavLink(item) ? (
              <li key={item.id}>
                <Link href={localizedHref(locale, "tutorial", `#${item.id}`)}>
                  {t(item.label)}
                </Link>
              </li>
            ) : (
              <li
                key={item.group}
                className={styles['docs-nav-group']}
                aria-hidden="true"
              >
                {t(item.group)}
              </li>
            )
          )}
        </ul>
      </nav>

      <div className={`${styles['docs-content']} glass-panel`}>
        <section id="introduction">
          <h1>{t("docs.intro.title")}</h1>
          <p>{t("docs.intro.p1")}</p>
        </section>

        <section id="quickstart">
          <h2>{t("docs.quickstart.title")}</h2>
          <p className={styles['quickstart-lead']}>{t("docs.quickstart.lead")}</p>

          <div className={styles['step-card']}>
            <h3>{t("docs.quickstart.prep.title")}</h3>
            <ul className={styles['prep-list']}>
              <li>{t("docs.quickstart.prep.1")}</li>
              <li>{t("docs.quickstart.prep.2")}</li>
              <li>{t("docs.quickstart.prep.3")}</li>
            </ul>
          </div>

          <div className={styles['step-card']}>
            <h3>{t("docs.quickstart.computer.title")}</h3>
            <p>{t("docs.quickstart.computer.desc")}</p>
            <div className={styles['prompt-card']}>
              <CodeBlock
                code={t("docs.agentInstall.prompt.text")}
                analyticsEvent="config_copy"
                analyticsLabel="quickstart-install-prompt"
              />
            </div>
            <p>{t("docs.quickstart.computer.what")}</p>
          </div>

          <div className={styles['step-card']}>
            <h3>{t("docs.quickstart.phone.title")}</h3>
            <ol>
              <li>{t("docs.quickstart.phone.1")}</li>
              <li>{t("docs.quickstart.phone.2")}</li>
            </ol>
          </div>

          <div className={styles['step-card']}>
            <h3>{t("docs.quickstart.first.title")}</h3>
            <p>{t("docs.quickstart.first.desc")}</p>
            <div className={styles['prompt-card']}>
              <CodeBlock
                code={t("docs.write.prompt.sample")}
                analyticsEvent="config_copy"
                analyticsLabel="quickstart-first-skill"
              />
            </div>
            <p>{t("docs.quickstart.first.what")}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
