"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";

interface CodeBlockProps {
  code: string;
  style?: CSSProperties;
}

type CopyState = "idle" | "copying" | "success" | "error";

export default function CodeBlock({ code, style }: CodeBlockProps) {
  const { t } = useI18n();
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const buttonLabel =
    copyState === "success"
      ? t("code.copySuccess")
      : copyState === "error"
        ? t("code.copyError")
        : t("code.copyIdle");

  return (
    <div className="code-block-wrapper" style={style}>
      <pre className="code-block code-font">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="code-copy-btn"
        disabled={copyState === "copying"}
        aria-label={t("code.copyAria")}
        aria-live="polite"
        data-state={copyState}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
