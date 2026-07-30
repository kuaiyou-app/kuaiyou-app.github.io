"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/lib/skills";
import { useI18n } from "@/lib/i18n";
import styles from "./SkillCard.module.css";

interface SkillCardProps {
  skill: Skill;
  baseUrl: string;
}

type CopyState = "idle" | "copying" | "success" | "error";

export default function SkillCard({ skill, baseUrl }: SkillCardProps) {
  const { t } = useI18n();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [jsonUrl, setJsonUrl] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const langAttr =
    skill.language === "zh"
      ? "zh-CN"
      : skill.language === "mixed"
        ? "zh-CN"
        : undefined;

  const categoryLabel =
    skill.category === "examples"
      ? t("skills.category.examples")
      : t("skills.category.tests");

  const resolveUrl = () =>
    new URL(`${baseUrl}/${skill.file}`, window.location.origin).href;

  const handleCopy = async () => {
    if (copyState === "copying") return;
    const url = resolveUrl();
    setJsonUrl(url);
    setCopyState("copying");

    try {
      await navigator.clipboard.writeText(url);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState("idle"), 2500);
  };

  const buttonLabel =
    copyState === "copying"
      ? t("skills.copyCopying")
      : copyState === "success"
        ? t("skills.copySuccess")
        : copyState === "error"
          ? t("skills.copyError")
          : t("skills.copyIdle");

  return (
    <article className={`glass-panel ${styles['skill-card']}`}>
      <div className={styles['card-header']}>
        <h3 className={styles['card-title']} lang={langAttr}>
          {skill.name}
        </h3>
        <div className={styles['card-badges']}>
          <span className={`${styles['card-badge']} ${styles['category-badge']}`}>{categoryLabel}</span>
          <span className={`${styles['card-badge']} ${styles['mode-badge']} code-font`}>
            {skill.executionMode}
          </span>
        </div>
      </div>

      <p className={styles['card-desc']} lang={langAttr}>
        {skill.description}
      </p>

      <div className={styles['card-footer']}>
        <div className={`${styles['card-id']} code-font`} title={skill.id}>
          {skill.id}
        </div>
        <div className={styles['card-actions']}>
          <a
            className={`${styles['copy-btn']} ${styles['card-link-btn']}`}
            href={`${baseUrl}/${skill.file}`}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="skill_link_copy"
            data-analytics-label={`view:${skill.id}`}
          >
            {t("skills.viewJson")}
            <span className="sr-only">{t("nav.opensNewTab")}</span>
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className={styles['copy-btn']}
            disabled={copyState === "copying"}
            aria-live="polite"
            data-analytics-event="skill_link_copy"
            data-analytics-label={`copy:${skill.id}`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>

      {copyState === "error" && (
        <div className={styles['copy-fallback']} role="alert">
          <p>{t("skills.copyFallback")}</p>
          <input
            className={`${styles['copy-fallback-input']} code-font`}
            readOnly
            value={jsonUrl || `${baseUrl}/${skill.file}`}
            onFocus={(e) => e.currentTarget.select()}
            aria-label={t("skills.copyFallbackAria", { id: skill.id })}
          />
        </div>
      )}
    </article>
  );
}
