"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import SkillCard from "@/components/SkillCard";
import type { Skill, SkillCategory } from "@/lib/skills";
import { useI18n } from "@/lib/i18n";
import styles from "./HomePage.module.css";

interface SkillsExplorerProps {
  skills: Skill[];
  baseUrl: string;
}

type Filter = "all" | SkillCategory;

// Initial fallback for SSR
const INITIAL_VISIBLE_COUNT = 6;

export default function SkillsExplorer({
  skills,
  baseUrl,
}: SkillsExplorerProps) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const gridRef = useRef<HTMLUListElement>(null);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("skills.filter.all") },
    { id: "examples", label: t("skills.filter.examples") },
    { id: "compatibility-tests", label: t("skills.filter.tests") },
  ];

  const filteredSkills = useMemo(() => {
    const q = search.trim().toLowerCase();
    return skills.filter((skill) => {
      if (filter !== "all" && skill.category !== filter) return false;
      if (!q) return true;
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.id.toLowerCase().includes(q) ||
        skill.executionMode.toLowerCase().includes(q)
      );
    });
  }, [skills, search, filter]);

  // Filter/search changes should re-collapse.
  useEffect(() => {
    setExpanded(false);
  }, [search, filter]);

  // Dynamically calculate how many items to show based on grid width
  // grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr))
  // gap: 24px
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Calculate columns: (width + gap) / (minColumnWidth + gap)
        const cols = Math.max(1, Math.floor((width + 24) / 324));
        // Always show exactly 2 rows
        setVisibleCount(cols * 2);
      }
    });

    const el = gridRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]); // Re-bind observer if grid mounts/unmounts

  const visibleSkills = expanded
    ? filteredSkills
    : filteredSkills.slice(0, visibleCount);
  const canToggle = filteredSkills.length > visibleCount;

  return (
    <div
      className={styles['skills-explorer']}
      role="search"
      aria-label={t("skills.searchAria")}
    >
      <div className={styles['skills-toolbar']}>
        <div
          className={styles['filter-pills']}
          role="group"
          aria-label={t("skills.filterAria")}
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles['filter-pill']} ${filter === item.id ? styles.active : ""}`}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles['search-container']}>
          <label htmlFor="skill-search" className="sr-only">
            {t("skills.searchLabel")}
          </label>
          <input
            id="skill-search"
            type="search"
            placeholder={t("skills.searchPlaceholder")}
            className={`${styles['search-input']} glass-panel code-font`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-controls="skills-results"
          />
        </div>
      </div>

      <p className={styles['skills-result-count']} aria-live="polite" id="skills-results">
        {t("skills.result", { count: filteredSkills.length })}
      </p>

      <div className={`${styles['skills-howto']} glass-panel`}>
        <h3>{t("skills.howto.title")}</h3>
        <ol>
          <li>{t("skills.howto.1")}</li>
          <li>
            {t("skills.howto.2.before")} {t("skills.howto.2.after")}
          </li>
          <li>
            {t("skills.howto.3.before")} {t("skills.howto.3.after")}
          </li>
          <li>{t("skills.howto.4")}</li>
        </ol>
        <p className={styles['skills-howto-note']}>{t("skills.howto.note")}</p>
      </div>

      {filteredSkills.length > 0 ? (
        <>
          <ul ref={gridRef} className={styles['skills-grid']}>
            {visibleSkills.map((skill) => (
              <li key={skill.id} className={styles['skills-grid-item']}>
                <SkillCard skill={skill} baseUrl={baseUrl} />
              </li>
            ))}
          </ul>
          {canToggle ? (
            <div className={styles['skills-more']}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
              >
                {expanded ? t("skills.showLess") : t("skills.showMore")}
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className={`${styles['empty-state']} glass-panel`} role="status">
          {t("skills.empty", { query: search.trim() || filter })}
        </div>
      )}
    </div>
  );
}
