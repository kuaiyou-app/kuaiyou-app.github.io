"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import { useI18n, type I18nKey, type Locale } from "@/lib/i18n";
import { localizedHref } from "@/lib/routes";
import {
  AGENT_SKILL_INSTALL_CMD,
  AGENT_SKILL_SOURCE_URL,
  APP_DOWNLOAD_URL,
  NPM_PACKAGE_URL,
} from "@/lib/site";
import styles from "./DocsPage.module.css";

const MCP_JSON = `{
  "mcpServers": {
    "autoace": {
      "command": "autoace-cli",
      "args": [],
      "env": {
        "KUAIYOU_DEVICE_IP": "<DEVICE_IP:PORT>",
        "KUAIYOU_MCP_PAIRING_CODE": "<PAIRING_CODE>"
      }
    }
  }
}`;

const INSTALL_GLOBAL = `npm install -g autoace-cli@latest`;

const MCP_STDIO_JSON = `{
  "mcpServers": {
    "autoace": { "command": "autoace-cli", "args": [] }
  }
}`;

const MCP_NPX_JSON = `{
  "mcpServers": {
    "autoace": { "command": "npx", "args": ["-y", "autoace-cli@latest"] }
  }
}`;

const CLAUDE_MCP_ADD_CMD = `claude mcp add autoace -- autoace-cli`;

const CLAUDE_MCP_ADD_NPX_CMD = `claude mcp add autoace -- npx -y autoace-cli@latest`;

const CODEX_MCP_TOML = `[mcp_servers.autoace]
command = "autoace-cli"`;

const DOC_NAV_TOP_ITEMS = [
  ["introduction", "docs.nav.intro"],
  ["quickstart", "docs.nav.quickstart"],
] as const;

const DOC_NAV_TUTORIAL_ITEMS = [
  ["client-pick", "docs.tutorial.pick.title"],
  ["workflow", "docs.tutorial.workflow.title"],
  ["scenarios", "docs.tutorial.scenarios.title"],
  ["app-install", "docs.nav.app"],
  ["install", "docs.nav.install"],
  ["agent-skill", "docs.nav.agentSkill"],
  ["recovery", "docs.tutorial.recovery.title"],
] as const;

const SCENARIO_ROWS = [
  {
    scene: "docs.tutorial.scenarios.1.scene",
    prompt: "docs.tutorial.scenarios.1.prompt",
    path: "docs.tutorial.scenarios.1.path",
    note: "docs.tutorial.scenarios.1.note",
  },
  {
    scene: "docs.tutorial.scenarios.2.scene",
    prompt: "docs.tutorial.scenarios.2.prompt",
    path: "docs.tutorial.scenarios.2.path",
    note: "docs.tutorial.scenarios.2.note",
  },
  {
    scene: "docs.tutorial.scenarios.3.scene",
    prompt: "docs.tutorial.scenarios.3.prompt",
    path: "docs.tutorial.scenarios.3.path",
    note: "docs.tutorial.scenarios.3.note",
  },
  {
    scene: "docs.tutorial.scenarios.4.scene",
    prompt: "docs.tutorial.scenarios.4.prompt",
    path: "docs.tutorial.scenarios.4.path",
    note: "docs.tutorial.scenarios.4.note",
  },
  {
    scene: "docs.tutorial.scenarios.5.scene",
    prompt: "docs.tutorial.scenarios.5.prompt",
    path: "docs.tutorial.scenarios.5.path",
    note: "docs.tutorial.scenarios.5.note",
  },
  {
    scene: "docs.tutorial.scenarios.6.scene",
    prompt: "docs.tutorial.scenarios.6.prompt",
    path: "docs.tutorial.scenarios.6.path",
    note: "docs.tutorial.scenarios.6.note",
  },
  {
    scene: "docs.tutorial.scenarios.7.scene",
    prompt: "docs.tutorial.scenarios.7.prompt",
    path: "docs.tutorial.scenarios.7.path",
    note: "docs.tutorial.scenarios.7.note",
  },
] as const satisfies readonly {
  scene: I18nKey;
  prompt: I18nKey;
  path: I18nKey;
  note: I18nKey;
}[];

const RECOVERY_ROWS = [
  { label: "docs.tutorial.recovery.1.case", prompt: "docs.tutorial.recovery.1.prompt" },
  { label: "docs.tutorial.recovery.2.case", prompt: "docs.tutorial.recovery.2.prompt" },
  { label: "docs.tutorial.recovery.3.case", prompt: "docs.tutorial.recovery.3.prompt" },
  { label: "docs.tutorial.recovery.4.case", prompt: "docs.tutorial.recovery.4.prompt" },
] as const satisfies readonly { label: I18nKey; prompt: I18nKey }[];

export default function TutorialPageContent({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState("client-pick");

  useEffect(() => {
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

    DOC_NAV_TUTORIAL_ITEMS.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

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
          {DOC_NAV_TOP_ITEMS.map(([id, label]) => (
            <li key={id}>
              <Link href={localizedHref(locale, "docs", `#${id}`)}>
                {t(label)}
              </Link>
            </li>
          ))}
          <li className={styles['docs-nav-group']} aria-hidden="true">
            {t("docs.nav.tutorialGroup")}
          </li>
          {DOC_NAV_TUTORIAL_ITEMS.map(([id, label]) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className={activeSection === id ? styles.active : undefined}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setActiveSection(id)}
              >
                {t(label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${styles['docs-content']} glass-panel`}>
        <section id="client-pick">
          <h2>{t("docs.tutorial.pick.title")}</h2>
          <p>{t("docs.tutorial.pick.lead")}</p>

          <h3>{t("docs.tutorial.pick.cursor.title")}</h3>
          <p>{t("docs.tutorial.pick.cursor.steps")}</p>
          <CodeBlock
            code={MCP_STDIO_JSON}
            analyticsEvent="config_copy"
            analyticsLabel="tutorial-cursor-mcp"
          />

          <h3>{t("docs.tutorial.pick.claude.title")}</h3>
          <p>{t("docs.tutorial.pick.claude.steps")}</p>
          <CodeBlock
            code={CLAUDE_MCP_ADD_CMD}
            analyticsEvent="config_copy"
            analyticsLabel="tutorial-claude-mcp"
          />
          <p>{t("docs.tutorial.pick.claude.npx")}</p>
          <CodeBlock
            code={CLAUDE_MCP_ADD_NPX_CMD}
            analyticsEvent="config_copy"
            analyticsLabel="tutorial-claude-mcp-npx"
          />

          <h3>{t("docs.tutorial.pick.codex.title")}</h3>
          <p>{t("docs.tutorial.pick.codex.steps")}</p>
          <CodeBlock
            code={CODEX_MCP_TOML}
            analyticsEvent="config_copy"
            analyticsLabel="tutorial-codex-mcp"
          />

          <h3>{t("docs.tutorial.pick.generic.title")}</h3>
          <p>{t("docs.tutorial.pick.generic.steps")}</p>
          <CodeBlock
            code={MCP_NPX_JSON}
            analyticsEvent="config_copy"
            analyticsLabel="tutorial-generic-mcp"
          />
          <p>{t("docs.tutorial.pick.envNote")}</p>
          <CodeBlock
            code={MCP_JSON}
            analyticsEvent="config_copy"
            analyticsLabel="tutorial-env-variant"
          />

          <h3>{t("docs.tutorial.pick.common.title")}</h3>
          <ul>
            <li>{t("docs.tutorial.pick.common.1")}</li>
            <li>{t("docs.tutorial.pick.common.2")}</li>
            <li>{t("docs.tutorial.pick.common.3")}</li>
            <li>{t("docs.tutorial.pick.common.4")}</li>
          </ul>
        </section>

        <section id="workflow">
          <h2>{t("docs.tutorial.workflow.title")}</h2>
          <p>{t("docs.tutorial.workflow.lead")}</p>
          <ol>
            <li>{t("docs.tutorial.workflow.step.1")}</li>
            <li>{t("docs.tutorial.workflow.step.2")}</li>
            <li>{t("docs.tutorial.workflow.step.3")}</li>
            <li>{t("docs.tutorial.workflow.step.4")}</li>
            <li>{t("docs.tutorial.workflow.step.5")}</li>
          </ol>
          <div className={`${styles.alert} ${styles.info}`}>
            {t("docs.tutorial.workflow.plans")}
          </div>
        </section>

        <section id="scenarios">
          <h2>{t("docs.tutorial.scenarios.title")}</h2>
          <p>{t("docs.tutorial.scenarios.lead")}</p>

          {SCENARIO_ROWS.map((row) => (
            <div className={styles['step-card']} key={row.scene}>
              <h3>{t(row.scene)}</h3>
              <p className={styles['scenario-label']}>
                {t("docs.tutorial.scenarios.label.prompt")}
              </p>
              <div className={styles['prompt-card']}>
                <CodeBlock
                  code={t(row.prompt)}
                  analyticsEvent="config_copy"
                  analyticsLabel={`tutorial-scenario-${row.scene}`}
                />
              </div>
              <p>
                <strong>{t("docs.tutorial.scenarios.label.path")}：</strong>
                {t(row.path)}
              </p>
              <p>
                <strong>{t("docs.tutorial.scenarios.label.note")}：</strong>
                {t(row.note)}
              </p>
            </div>
          ))}

          <details className={styles['tutorial-details']}>
            <summary>{t("docs.tutorial.scenarios.8.summary")}</summary>
            <p>{t("docs.tutorial.scenarios.8.body")}</p>
          </details>

          <div className={`${styles.alert} ${styles.info}`}>
            {t("docs.tutorial.scenarios.forbidden")}
          </div>
        </section>

        <section id="app-install">
          <h2>{t("docs.app.title")}</h2>
          <p>{t("docs.app.p")}</p>
          <p>
            <a
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              data-analytics-event="app_download"
              data-analytics-label="docs-app-install"
            >
              {t("docs.app.download")}
              <span className="sr-only">{t("nav.opensNewTab")}</span>
            </a>
          </p>
          <div className={`${styles.alert} ${styles.info}`}>
            <strong>{t("docs.app.note.strong")}</strong> {t("docs.app.note")}
          </div>
        </section>

        <section id="install">
          <h2>{t("docs.install.title")}</h2>
          <p>{t("docs.install.p")}</p>
          <p>
            <a
              href={NPM_PACKAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="npm_open"
              data-analytics-label="docs-install"
            >
              {t("docs.install.npmLink")}
            </a>
          </p>

          <h3>{t("docs.install.req")}</h3>
          <ul>
            <li>{t("docs.install.req.1")}</li>
            <li>{t("docs.install.req.2")}</li>
          </ul>

          <h3>{t("docs.install.global")}</h3>
          <p>{t("docs.install.global.desc")}</p>
          <CodeBlock code={INSTALL_GLOBAL} analyticsEvent="config_copy" analyticsLabel="npm-global" />

          <h3>{t("docs.install.verify")}</h3>
          <p>{t("docs.install.verify.desc")}</p>
          <CodeBlock code="npm view autoace-cli version" />
          <div className={`${styles.alert} ${styles.info}`}>
            <strong>{t("docs.install.tip.strong")}</strong>{" "}
            {t("docs.install.tip")}
          </div>
        </section>

        <section id="agent-skill">
          <h2>{t("docs.agent.title")}</h2>
          <p>{t("docs.agent.p")}</p>
          <p>
            <a
              href={AGENT_SKILL_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("docs.agent.repoLink")}
            </a>
          </p>
          <CodeBlock
            code={AGENT_SKILL_INSTALL_CMD}
            analyticsEvent="config_copy"
            analyticsLabel="skills-add"
          />
        </section>

        <section id="recovery">
          <h2>{t("docs.tutorial.recovery.title")}</h2>
          <p>{t("docs.tutorial.recovery.lead")}</p>

          <div className={styles['table-scroll']}>
            <table className={styles['scenario-table']}>
              <thead>
                <tr>
                  <th scope="col">{t("docs.tutorial.recovery.col.case")}</th>
                  <th scope="col">{t("docs.tutorial.recovery.col.prompt")}</th>
                </tr>
              </thead>
              <tbody>
                {RECOVERY_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className={styles['scene-name']}>{t(row.label)}</td>
                    <td>
                      <CodeBlock
                        code={t(row.prompt)}
                        analyticsEvent="config_copy"
                        analyticsLabel="tutorial-recovery"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
