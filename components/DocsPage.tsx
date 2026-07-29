"use client";

import CodeBlock from "@/components/CodeBlock";
import { useI18n } from "@/lib/i18n";
import {
  AGENT_SKILL_NAME,
  AGENT_SKILL_RAW_URL,
  CORE_REPO_URL,
  NPM_PACKAGE_URL,
} from "@/lib/site";
import styles from "./DocsPage.module.css";

const MCP_JSON = `{
  "mcpServers": {
    "autoace": {
      "command": "npx",
      "args": ["-y", "autoace-cli"],
      "env": {
        "KUAIYOU_DEVICE_IP": "192.168.1.100:3847",
        "KUAIYOU_MCP_PAIRING_CODE": "482917"
      }
    }
  }
}`;

const CLAUDE_CODE_SKILL = `mkdir -p ~/.claude/skills/autoace
curl -fsSL ${AGENT_SKILL_RAW_URL} -o ~/.claude/skills/autoace/SKILL.md`;

const CODEX_SKILL = `mkdir -p ~/.codex/skills/autoace
curl -fsSL ${AGENT_SKILL_RAW_URL} -o ~/.codex/skills/autoace/SKILL.md`;

const INSTALL_GLOBAL = `npm install -g autoace-cli
autoace-cli`;

const INSTALL_SKILLS_CLI = `npx skills add kuaiyou-app/kuaiyou-open-source --skill autoace`;

const MCP_LAN_COMMAND = `KUAIYOU_DEVICE_IP=192.168.1.100:3847 KUAIYOU_MCP_PAIRING_CODE=482917 npx -y autoace-cli`;

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

export default function DocsPageContent() {
  const { t } = useI18n();

  return (
    <main id="main-content" className={`${styles['docs-container']} animate-fade-in`}>
      <nav className={`${styles['docs-sidebar']} glass-panel`} aria-label={t("docs.navAria")}>
        <ul className={styles['docs-nav']}>
          <li>
            <a href="#introduction" className={styles.active}>
              {t("docs.nav.intro")}
            </a>
          </li>
          <li>
            <a href="#names">{t("docs.nav.names")}</a>
          </li>
          <li>
            <a href="#install">{t("docs.nav.install")}</a>
          </li>
          <li>
            <a href="#agent-skill">{t("docs.nav.agentSkill")}</a>
          </li>
          <li>
            <a href="#quick-start">{t("docs.nav.quick")}</a>
          </li>
          <li>
            <a href="#write-skill">{t("docs.nav.write")}</a>
          </li>
          <li>
            <a href="#mcp-tools">{t("docs.nav.tools")}</a>
          </li>
          <li>
            <a href="#boundaries">{t("docs.nav.boundaries")}</a>
          </li>
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

        <section id="install">
          <h2>{t("docs.install.title")}</h2>
          <p>{t("docs.install.p")}</p>
          <p>
            <a href={NPM_PACKAGE_URL} target="_blank" rel="noopener noreferrer">
              {t("docs.install.npmLink")}
            </a>
          </p>

          <h3>{t("docs.install.req")}</h3>
          <ul>
            <li>{t("docs.install.req.1")}</li>
            <li>{t("docs.install.req.2")}</li>
          </ul>

          <h3>{t("docs.install.npx")}</h3>
          <p>{t("docs.install.npx.desc")}</p>
          <CodeBlock code="npx -y autoace-cli" />

          <h3>{t("docs.install.global")}</h3>
          <p>{t("docs.install.global.desc")}</p>
          <CodeBlock code={INSTALL_GLOBAL} />

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
              href={`${CORE_REPO_URL}/tree/main/agent-skills/autoace`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("docs.agent.repoLink")}
            </a>
          </p>

          <h3>{t("docs.agent.claude")}</h3>
          <CodeBlock code={CLAUDE_CODE_SKILL} />
          <p>{t("docs.agent.claude.invoke")}</p>

          <h3>{t("docs.agent.codex")}</h3>
          <CodeBlock code={CODEX_SKILL} />
          <p>{t("docs.agent.codex.invoke")}</p>

          <h3>{t("docs.agent.cursor")}</h3>
          <p>{t("docs.agent.cursor.desc")}</p>

          <h3>{t("docs.agent.npx")}</h3>
          <CodeBlock code={INSTALL_SKILLS_CLI} />
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

          <h3>{t("docs.quick.start")}</h3>
          <p>{t("docs.quick.npm")}</p>
          <p>{t("docs.quick.lan")}</p>
          <CodeBlock code={MCP_LAN_COMMAND} />
          <p>{t("docs.quick.usb")}</p>
          <CodeBlock code="npx -y autoace-cli" />

          <h3>{t("docs.quick.connect")}</h3>
          <p>{t("docs.quick.claude")}</p>
          <CodeBlock code={MCP_JSON} />
          <p>{t("docs.quick.clients")}</p>
          <ul>
            <li>{t("docs.quick.clients.1")}</li>
            <li>{t("docs.quick.clients.2")}</li>
            <li>{t("docs.quick.clients.3")}</li>
          </ul>
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
