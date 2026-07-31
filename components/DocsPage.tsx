"use client";

import { useEffect, useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import { useI18n, type Locale } from "@/lib/i18n";
import {
  AGENT_SKILL_INSTALL_CMD,
  AGENT_SKILL_NAME,
  AGENT_SKILL_SOURCE_URL,
  APP_DOWNLOAD_URL,
  CLI_INSTALL_GUIDE_URL,
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

const MCP_LAN_COMMAND = `KUAIYOU_DEVICE_IP=<DEVICE_IP:PORT> KUAIYOU_MCP_PAIRING_CODE=<PAIRING_CODE> autoace-cli`;
const DOC_NAV_ITEMS = [
  ["introduction", "docs.nav.intro"],
  ["names", "docs.nav.names"],
  ["app-install", "docs.nav.app"],
  ["agent-install", "docs.nav.agentInstall"],
  ["install", "docs.nav.install"],
  ["agent-skill", "docs.nav.agentSkill"],
  ["quick-start", "docs.nav.quick"],
  ["write-skill", "docs.nav.write"],
  ["mcp-tools", "docs.nav.tools"],
  ["boundaries", "docs.nav.boundaries"],
] as const;

const SKILL_EXAMPLE_JSON = `{
  "id": "reactive_click_confirm",
  "name": "Click the confirm button",
  "description": "Tap the confirm button whenever it appears, up to 3 times",
  "goals": [
    {
      "id": "click_confirm",
      "name": "Click confirm",
      "trigger": {
        "type": "elementVisible",
        "target": { "type": "text", "text": "确认" }
      },
      "actions": [
        { "type": "tap", "target": { "type": "text", "text": "确认" } }
      ],
      "constraints": { "maxExecutions": 3, "cooldownMs": 2000 }
    }
  ],
  "termination": { "type": "timeout", "maxDurationMs": 30000 }
}`;

export default function DocsPageContent({ locale }: { locale: Locale }) {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState("introduction");

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

    DOC_NAV_ITEMS.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      id="main-content"
      data-locale={locale}
      className={`${styles['docs-container']} animate-fade-in`}
    >
      <nav className={`${styles['docs-sidebar']} glass-panel`} aria-label={t("docs.navAria")}>
        <ul className={styles['docs-nav']}>
          {DOC_NAV_ITEMS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? styles.active : undefined}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setActiveSection(id)}
              >
                {t(label)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${styles['docs-content']} glass-panel`}>
        <section id="introduction">
          <h1>{t("docs.intro.title")}</h1>
          <p>{t("docs.intro.p1")}</p>
          <div className={`${styles.alert} ${styles.info}`}>
            <strong>{t("docs.intro.note.strong")}</strong>{" "}
            {t("docs.intro.note")}
          </div>
        </section>

        <section id="names">
          <h2>{t("docs.names.title")}</h2>
          <p>{t("docs.names.p")}</p>
          <ul>
            <li>
              <strong>autoace-cli</strong> — {t("docs.names.cli")}
            </li>
            <li>
              <strong>{AGENT_SKILL_NAME}</strong> — {t("docs.names.agent")}
            </li>
            <li>
              <strong>{t("docs.names.skillLabel")}</strong> — {t("docs.names.skill")}
            </li>
          </ul>
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

        <section id="agent-install">
          <h2>{t("docs.agentInstall.title")}</h2>
          <p>{t("docs.agentInstall.p")}</p>

          <h3>{t("docs.agentInstall.prompt")}</h3>
          <p>{t("docs.agentInstall.prompt.desc")}</p>
          <CodeBlock
            code={t("docs.agentInstall.prompt.text")}
            analyticsEvent="config_copy"
            analyticsLabel="agent-install-prompt"
          />
          <p>
            <a
              href={CLI_INSTALL_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="docs_setup"
              data-analytics-label="agent-install-guide"
            >
              {t("docs.agentInstall.guideLink")}
              <span className="sr-only">{t("nav.opensNewTab")}</span>
            </a>
          </p>
          <div className={`${styles.alert} ${styles.info}`}>
            <strong>{t("docs.agentInstall.note.strong")}</strong>{" "}
            {t("docs.agentInstall.note")}
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

        <section id="quick-start">
          <h2>{t("docs.quick.title")}</h2>
          <p>{t("docs.quick.p")}</p>

          <h3>{t("docs.quick.prereq")}</h3>
          <ul>
            <li>{t("docs.quick.prereq.1")}</li>
            <li>{t("docs.quick.prereq.2")}</li>
            <li>{t("docs.quick.prereq.3")}</li>
            <li>{t("docs.quick.prereq.4")}</li>
          </ul>

          <h3>{t("docs.quick.connect")}</h3>
          <p>{t("docs.quick.claude")}</p>
          <CodeBlock code={MCP_JSON} analyticsEvent="config_copy" analyticsLabel="mcp-json" />
          <p>{t("docs.quick.lan")}</p>
          <CodeBlock code={MCP_LAN_COMMAND} analyticsEvent="config_copy" analyticsLabel="mcp-lan" />
          <p>{t("docs.quick.lan.note")}</p>
          <p>{t("docs.quick.compat")}</p>
        </section>

        <section id="write-skill">
          <h2>{t("docs.write.title")}</h2>
          <p>{t("docs.write.lead")}</p>

          <h3>{t("docs.write.flow")}</h3>
          <ol>
            <li>{t("docs.write.flow.1")}</li>
            <li>{t("docs.write.flow.2")}</li>
            <li>{t("docs.write.flow.3")}</li>
            <li>{t("docs.write.flow.4")}</li>
            <li>{t("docs.write.flow.5")}</li>
          </ol>

          <h3>{t("docs.write.prompt")}</h3>
          <p>{t("docs.write.prompt.desc")}</p>
          <CodeBlock code={t("docs.write.prompt.sample")} />
          <p>{t("docs.write.prompt.more")}</p>
          <ul>
            <li>
              <code>{t("docs.write.prompt.alt1")}</code>
            </li>
            <li>
              <code>{t("docs.write.prompt.alt2")}</code>
            </li>
          </ul>

          <h3>{t("docs.write.example")}</h3>
          <p>
            {t("docs.write.example.desc")} <code>skills/</code>
            {t("docs.write.example.end")}
          </p>
          <CodeBlock code={SKILL_EXAMPLE_JSON} />
          <div className={`${styles.alert} ${styles.info}`}>
            <strong>{t("docs.write.tip.strong")}</strong> {t("docs.write.tip")}
          </div>
        </section>

        <section id="mcp-tools">
          <h2>{t("docs.tools.title")}</h2>
          <p>{t("docs.tools.p")}</p>
          <ul>
            <li>{t("docs.tools.1")}</li>
            <li>{t("docs.tools.2")}</li>
            <li>{t("docs.tools.3")}</li>
            <li>{t("docs.tools.4")}</li>
          </ul>
          <div className={`${styles.alert} ${styles.info}`}>
            <strong>{t("docs.tools.tip.strong")}</strong> {t("docs.tools.tip")}
          </div>
        </section>

        <section id="boundaries">
          <h2>{t("docs.bound.title")}</h2>
          <ul>
            <li>{t("docs.bound.1")}</li>
            <li>{t("docs.bound.2")}</li>
            <li>{t("docs.bound.3")}</li>
            <li>{t("docs.bound.4")}</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
