"use client";

import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import SkillsExplorer from "@/components/SkillsExplorer";
import type { Skill } from "@/lib/skills";
import { CORE_REPO_URL, SKILLS_PUBLIC_PATH } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import styles from "./HomePage.module.css";

export default function HomePage({ skills }: { skills: Skill[] }) {
  const { t } = useI18n();
  const exampleCount = skills.filter((s) => s.category === "examples").length;
  const testCount = skills.filter(
    (s) => s.category === "compatibility-tests"
  ).length;

  return (
    <main id="main-content" className={`${styles.container} animate-fade-in`}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`${styles['hero-badge']} code-font`}>{t("home.badge")}</div>
        <h1 id="hero-title" className={styles['hero-title']}>
          <span className={styles['hero-title-line']}>{t("home.title.line1")}</span>{" "}
          <span className={`${styles['hero-title-line']} gradient-text`}>
            {t("home.title.line2")}
          </span>
        </h1>
        <p className={styles['hero-subtitle']}>{t("home.subtitle")}</p>

        <div className={styles['hero-actions']}>
          <Link href="/docs#install" className="btn btn-primary">
            {t("home.cta.primary")}
          </Link>
          <a href="#how-it-works" className="btn btn-secondary">
            {t("home.cta.how")}
          </a>
          <a
            href={CORE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            {t("home.cta.source")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
        </div>

        <p className={styles['hero-boundary']}>{t("home.boundary")}</p>

        <ul className={styles['hero-tags']} aria-label={t("home.tags.aria")}>
          <li>{t("home.tag.android")}</li>
          <li>{t("home.tag.app")}</li>
          <li>{t("home.tag.mcp")}</li>
          <li>{t("home.tag.bridge")}</li>
        </ul>
      </section>

      <section
        id="how-it-works"
        className={`${styles['how-it-works']} glass-panel`}
        aria-labelledby="how-it-works-title"
      >
        <div className={styles['section-header']}>
          <h2 id="how-it-works-title">{t("home.how.title")}</h2>
          <p>{t("home.how.subtitle")}</p>
        </div>

        <ol className={styles['architecture-flow']}>
          <li className={styles['arch-node']}>
            <div className={styles['node-icon']} aria-hidden="true">
              🧠
            </div>
            <div className={styles['node-title']}>{t("home.how.node1.title")}</div>
            <div className={styles['node-desc']}>{t("home.how.node1.desc")}</div>
          </li>

          <li className={styles['arch-arrow']} aria-hidden="true">
            <div className={`${styles['arrow-text']} code-font`}>{t("home.how.arrow1")}</div>
            <div className={styles['arrow-line']}></div>
          </li>

          <li className={`${styles['arch-node']} ${styles.highlight}`}>
            <div className={styles['node-icon']} aria-hidden="true">
              ⚡
            </div>
            <div className={styles['node-title']}>{t("home.how.node2.title")}</div>
            <div className={styles['node-desc']}>{t("home.how.node2.desc")}</div>
          </li>

          <li className={styles['arch-arrow']} aria-hidden="true">
            <div className={`${styles['arrow-text']} code-font`}>{t("home.how.arrow2")}</div>
            <div className={styles['arrow-line']}></div>
          </li>

          <li className={styles['arch-node']}>
            <div className={styles['node-icon']} aria-hidden="true">
              📱
            </div>
            <div className={styles['node-title']}>{t("home.how.node3.title")}</div>
            <div className={styles['node-desc']}>{t("home.how.node3.desc")}</div>
          </li>
        </ol>

        <p className="sr-only">{t("home.how.sr")}</p>
      </section>

      <section
        className={styles['capabilities-section']}
        aria-labelledby="capabilities-title"
      >
        <div className={styles['section-header']}>
          <h2 id="capabilities-title">{t("home.cap.title")}</h2>
          <p>{t("home.cap.subtitle")}</p>
        </div>
        <div className={styles['capabilities-grid']}>
          <article className={`glass-panel ${styles['capability-card']}`}>
            <h3>{t("home.cap.1.title")}</h3>
            <p>{t("home.cap.1.desc")}</p>
          </article>
          <article className={`glass-panel ${styles['capability-card']}`}>
            <h3>{t("home.cap.2.title")}</h3>
            <p>{t("home.cap.2.desc")}</p>
          </article>
          <article className={`glass-panel ${styles['capability-card']}`}>
            <h3>{t("home.cap.3.title")}</h3>
            <p>{t("home.cap.3.desc")}</p>
          </article>
          <article className={`glass-panel ${styles['capability-card']}`}>
            <h3>{t("home.cap.4.title")}</h3>
            <p>{t("home.cap.4.desc")}</p>
          </article>
        </div>
      </section>

      <section
        className={`${styles['quickstart-section']} glass-panel`}
        aria-labelledby="quickstart-title"
      >
        <div className={styles['section-header']}>
          <h2 id="quickstart-title">{t("home.qs.title")}</h2>
          <p>{t("home.qs.subtitle")}</p>
        </div>
        <ol className={styles['quickstart-steps']}>
          <li>
            <strong>{t("home.qs.1.strong")}</strong> {t("home.qs.1.rest")}
          </li>
          <li>
            <strong>{t("home.qs.2.strong")}</strong> {t("home.qs.2.rest")}
          </li>
          <li>
            <strong>{t("home.qs.3.strong")}</strong> {t("home.qs.3.rest")}
            <CodeBlock
              code={t("home.qs.3.cmd")}
              style={{ marginTop: "0.75rem" }}
            />
            <p style={{ marginTop: "0.5rem", fontSize: "0.9em", opacity: 0.85 }}>
              {t("home.qs.3.alt")}
            </p>
          </li>
          <li>{t("home.qs.4")}</li>
          <li>{t("home.qs.5")}</li>
        </ol>
        <div className={styles['quickstart-actions']}>
          <Link href="/docs#install" className="btn btn-primary">
            {t("home.qs.installGuide")}
          </Link>
          <Link href="/docs#quick-start" className="btn btn-secondary">
            {t("home.qs.openGuide")}
          </Link>
          <Link href="/docs#mcp-tools" className="btn btn-secondary">
            {t("home.qs.tools")}
          </Link>
        </div>
      </section>

      <section
        id="skills"
        className={styles['skills-section']}
        aria-labelledby="skills-title"
      >
        <div className={styles['section-header']}>
          <h2 id="skills-title">{t("home.skills.title")}</h2>
          <p>
            {t("home.skills.subtitle", {
              examples: exampleCount,
              tests: testCount,
            })}
          </p>
        </div>

        <SkillsExplorer skills={skills} baseUrl={SKILLS_PUBLIC_PATH} />
      </section>

    <section
        className={`${styles['security-section']} glass-panel`}
        aria-labelledby="security-title"
      >
        <div className={styles['section-header']}>
          <h2 id="security-title">{t("home.sec.title")}</h2>
          <p>{t("home.sec.subtitle")}</p>
        </div>
        <ul className={styles['security-list']}>
          <li>{t("home.sec.1")}</li>
          <li>{t("home.sec.2")}</li>
          <li>{t("home.sec.3")}</li>
          <li>{t("home.sec.4")}</li>
        </ul>
      </section>

      <section
        className={`${styles['faq-section']}`}
        aria-labelledby="faq-title"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className={styles['section-header']}>
          <h2 id="faq-title">{t("home.faq.title")}</h2>
        </div>
        <div className={styles['faq-list']}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`${styles['faq-item']} glass-panel`}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 itemProp="name">{t(`home.faq.q${i}` as Parameters<typeof t>[0])}</h3>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{t(`home.faq.a${i}` as Parameters<typeof t>[0])}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
