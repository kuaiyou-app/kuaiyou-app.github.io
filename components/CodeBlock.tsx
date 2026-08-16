"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import type { AnalyticsEventName } from "@/lib/analytics";
import styles from "./DocsPage.module.css";

interface CodeBlockProps {
  code: string;
  style?: CSSProperties;
  analyticsEvent?: AnalyticsEventName;
  analyticsLabel?: string;
  header?: ReactNode;
  copyIdleLabel?: string;
  copyButtonClassName?: string;
  toolbarExtra?: ReactNode;
  toolbarClassName?: string;
}

type CopyState = "idle" | "copying" | "success" | "error";

export default function CodeBlock({
  code,
  style,
  analyticsEvent,
  analyticsLabel,
  header,
  copyIdleLabel,
  copyButtonClassName,
  toolbarExtra,
  toolbarClassName,
}: CodeBlockProps) {
  const { t } = useI18n();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleCopy = async () => {
    if (copyState === "copying") return;
    setCopyState("copying");

    try {
      await navigator.clipboard.writeText(code);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState("idle"), 2500);
  };

  const idleLabel = copyIdleLabel ?? t("code.copyIdle");
  const buttonLabel =
    copyState === "success"
      ? t("code.copySuccess")
      : copyState === "error"
        ? t("code.copyError")
        : idleLabel;

  const copyButton = (
    <button
      type="button"
      onClick={handleCopy}
      className={copyButtonClassName ?? styles["code-copy-btn"]}
      disabled={copyState === "copying"}
      aria-label={copyIdleLabel ?? t("code.copyAria")}
      aria-live="polite"
      data-state={copyState}
      data-analytics-event={analyticsEvent}
      data-analytics-label={analyticsLabel}
    >
      {buttonLabel}
    </button>
  );

  if (header) {
    return (
      <div className={styles["code-block-wrapper"]} style={style}>
        <div className={`${styles["code-block-toolbar"]}${toolbarClassName ? ` ${toolbarClassName}` : ""}`}>
          <div className={styles["code-block-lead"]}>{header}</div>
          <div className={styles["code-block-actions"]}>
            {copyButton}
            {toolbarExtra}
          </div>
        </div>
        <pre className={`${styles["code-block"]} code-font`}>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={styles["code-block-wrapper"]} style={style}>
      <pre className={`${styles["code-block"]} code-font`}>
        <code>{code}</code>
      </pre>
      {copyButton}
    </div>
  );
}
