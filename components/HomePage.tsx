"use client";

import Link from "next/link";
import Image from "next/image";
import CodeBlock from "@/components/CodeBlock";
import SkillsExplorer from "@/components/SkillsExplorer";
import type { Skill } from "@/lib/skills";
import { BILIBILI_URL, SKILLS_PUBLIC_PATH } from "@/lib/site";
import { useI18n, type Locale } from "@/lib/i18n";
import { localizedHref } from "@/lib/routes";
import styles from "./HomePage.module.css";

export default function HomePage({ skills, locale }: { skills: Skill[]; locale: Locale }) {
  const { t } = useI18n();
  const exampleCount = skills.filter((s) => s.category === "examples").length;

  return (
    <main id="main-content" className={styles.container}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles['hero-copy']}>
          <div className={`${styles['hero-badge']} code-font`}>{t("home.badge")}</div>
          <h1 id="hero-title" className={styles['hero-title']}>
            <span className={styles['hero-title-line']}>{t("home.title.line1")}</span>
            <span className={`${styles['hero-title-line']} gradient-text`}>
              {t("home.title.line2")}
            </span>
          </h1>

          <div className={styles['hero-prompt']}>
            <CodeBlock
              code={t("home.qs.prompt")}
              header={<p>{t("home.qs.lead")}</p>}
              copyIdleLabel={t("home.cta.how")}
              copyButtonClassName={`btn btn-primary ${styles['hero-copy-btn']}`}
              toolbarClassName={styles['hero-prompt-toolbar']}
              analyticsEvent="config_copy"
              analyticsLabel="home-hero-command"
              toolbarExtra={
                <Link
                  href={localizedHref(locale, "docs", "#quickstart")}
                  className={`btn btn-secondary ${styles['hero-docs-btn']}`}
                  data-analytics-event="docs_setup"
                  data-analytics-label="hero"
                >
                  {t("home.qs.title")}
                </Link>
              }
            />
          </div>
        </div>

        <aside className={`${styles['workflow-preview']} glass-panel`} aria-label={t("home.workflow.aria")}>
          <div className={styles['workflow-topline']}>
            <span className={styles['workflow-live']} aria-hidden="true" />
            <span className="code-font">{t("home.workflow.eyebrow")}</span>
          </div>
          <div className={styles['workflow-stage']}>
            <div className={styles['session-pane']}>
              <div className={styles['terminal-window']}>
                <div className={styles['terminal-chrome']}>
                  <span className={styles['terminal-traffic']} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className={`${styles['terminal-title']} code-font`}>{t("home.workflow.paneAgent")}</span>
                </div>
                <div className={`${styles.session} code-font`} role="region" aria-label={t("home.workflow.sessionAria")}>
                  <div className={`${styles['session-scene']} ${styles['session-scene-install']}`}>
                    <p className={styles['session-line']}>
                      <span className={styles['session-prompt-mark']} aria-hidden="true">❯</span>
                      <span className={`${styles['session-typed']} ${styles['session-typed-install']}`}>
                        {t("home.qs.prompt")}
                      </span>
                      <span className={`${styles['session-caret']} ${styles['session-caret-install']}`} aria-hidden="true" />
                    </p>
                    <div className={styles['session-block']}>
                      <p className={styles['session-cmd']}>
                        <span className={styles['session-prompt-mark']} aria-hidden="true">$</span>
                        {t("home.session.install.cli")}
                      </p>
                      <p className={styles['session-ok']}>{t("home.session.install.cli.result")}</p>
                    </div>
                    <div className={styles['session-block']}>
                      <p className={styles['session-cmd']}>
                        <span className={styles['session-prompt-mark']} aria-hidden="true">$</span>
                        {t("home.session.install.skill")}
                      </p>
                      <p className={styles['session-ok']}>{t("home.session.install.skill.result")}</p>
                    </div>
                    <div className={styles['session-block']}>
                      <p className={styles['session-out']}>{t("home.session.install.mcp")}</p>
                      <p className={styles['session-ok']}>{t("home.session.install.mcp.result")}</p>
                    </div>
                    <div className={styles['session-block']}>
                      <p className={styles['session-ok']}>{t("home.session.install.ready")}</p>
                    </div>
                  </div>
                  <div className={`${styles['session-scene']} ${styles['session-scene-pair']}`}>
                    <p className={styles['session-line']}>
                      <span className={styles['session-prompt-mark']} aria-hidden="true">❯</span>
                      <span className={`${styles['session-typed']} ${styles['session-typed-pair']}`}>
                        {t("home.session.pair.prompt")}
                      </span>
                      <span className={`${styles['session-caret']} ${styles['session-caret-pair']}`} aria-hidden="true" />
                    </p>
                    <div className={styles['session-block']}>
                      <p className={styles['session-cmd']}>
                        <span className={styles['session-prompt-mark']} aria-hidden="true">$</span>
                        {t("home.session.pair.cmd")}
                      </p>
                      <p className={styles['session-ok']}>{t("home.session.pair.result")}</p>
                    </div>
                    <div className={styles['session-block']}>
                      <p className={styles['session-ok']}>{t("home.session.pair.ready")}</p>
                    </div>
                  </div>
                  <div className={`${styles['session-scene']} ${styles['session-scene-skill']}`}>
                    <p className={styles['session-line']}>
                      <span className={styles['session-prompt-mark']} aria-hidden="true">❯</span>
                      <span className={`${styles['session-typed']} ${styles['session-typed-skill']}`}>
                        {t("home.session.prompt")}
                      </span>
                      <span className={`${styles['session-caret']} ${styles['session-caret-skill']}`} aria-hidden="true" />
                    </p>
                    <div className={styles['session-block']}>
                      <p className={styles['session-cmd']}>
                        <span className={styles['session-prompt-mark']} aria-hidden="true">$</span>
                        {t("home.session.observe")}
                      </p>
                      <div className={styles['session-observe']}>
                        <Image
                          src="/screenshots/skill-list.jpg"
                          alt={t("home.session.observe.alt")}
                          width={1440}
                          height={3168}
                          decoding="async"
                        />
                        <p>{t("home.session.observe.meta")}</p>
                      </div>
                    </div>
                    <div className={styles['session-block']}>
                      <p className={styles['session-out']}>{t("home.session.write")}</p>
                      <pre className={styles['session-code']}>
                        <code>
                          {t("home.session.write.launch")}
                          {"\n"}
                          {t("home.session.write.wait")}
                          {"\n"}
                          {t("home.session.write.tapNav")}
                          {"\n"}
                          {t("home.session.write.tapPlay")}
                        </code>
                      </pre>
                    </div>
                    <div className={styles['session-block']}>
                      <p className={styles['session-cmd']}>
                        <span className={styles['session-prompt-mark']} aria-hidden="true">$</span>
                        {t("home.session.validate")}
                      </p>
                      <p className={styles['session-ok']}>{t("home.session.validate.result")}</p>
                    </div>
                    <div className={styles['session-block']}>
                      <p className={styles['session-cmd']}>
                        <span className={styles['session-prompt-mark']} aria-hidden="true">$</span>
                        {t("home.session.push")}
                      </p>
                      <p className={styles['session-ok']}>{t("home.session.push.result")}</p>
                      <p className={styles['session-hint']}>{t("home.session.push.hint")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['workflow-bridge']} aria-hidden="true">
              <span className={`${styles['workflow-bridge-label']} code-font`}>{t("home.workflow.bridge")}</span>
              <span className={styles['workflow-bridge-line']} />
            </div>
            <figure className={`${styles['workflow-screenshot']} ${styles['workflow-screenshot-live']}`}>
              <p className={`${styles['pane-label']} code-font`}>{t("home.workflow.panePhone")}</p>
              <div className={styles['workflow-phone']}>
                <Image
                  className={styles['workflow-phone-mcp']}
                  src="/screenshots/mcp-settings.jpg"
                  alt={t("home.product.mcp.alt")}
                  width={1440}
                  height={3168}
                  priority
                  decoding="async"
                />
                <Image
                  className={styles['workflow-phone-confirm']}
                  src="/screenshots/run-confirmation.jpg"
                  alt={t("home.product.confirm.alt")}
                  width={1440}
                  height={3168}
                  decoding="async"
                  aria-hidden="true"
                />
                <Image
                  className={styles['workflow-phone-result']}
                  src="/screenshots/execution-result.jpg"
                  alt={t("home.product.result.alt")}
                  width={1440}
                  height={3168}
                  decoding="async"
                  aria-hidden="true"
                />
              </div>
              <figcaption>{t("home.workflow.phoneCaption")}</figcaption>
            </figure>
            <div className={styles['workflow-status']}>
              <span aria-hidden="true">✓</span>
              {t("home.workflow.status")}
            </div>
            <a
              href={BILIBILI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['workflow-demo-link']}
            >
              {t("home.cta.demo")} →
              <span className="sr-only">{t("nav.opensNewTab")}</span>
            </a>
          </div>
        </aside>
      </section>

      <section className={styles['use-cases-section']} aria-labelledby="use-cases-title">
        <div className={styles['section-header']}>
          <h2 id="use-cases-title">{t("home.use.title")}</h2>
          <p>{t("home.use.subtitle")}</p>
        </div>
        <div className={styles['use-cases-grid']}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className={`glass-panel ${styles['use-case-card']}`}>
              <span className={`${styles['use-case-index']} code-font`}>0{i}</span>
              <h3>{t(`home.use.${i}.title` as Parameters<typeof t>[0])}</h3>
              <p>{t(`home.use.${i}.desc` as Parameters<typeof t>[0])}</p>
            </article>
          ))}
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
            })}
          </p>
        </div>

        <SkillsExplorer skills={skills} baseUrl={SKILLS_PUBLIC_PATH} />
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
          {[1, 2, 3, 4].map((i) => (
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
