import React, { useEffect, useMemo, useRef } from "react";
import hljs from "highlight.js";

type Props = {
  code: string;
  language?: string;
  className?: string;
};

function normalizeLanguage(language?: string) {
  if (!language) return undefined;
  return language.replace(/^language-/, "").trim() || undefined;
}

export function HighlightedCodeBlock({ code, language, className }: Props) {
  const codeElRef = useRef<HTMLElement | null>(null);

  const normalizedLanguage = useMemo(() => normalizeLanguage(language), [language]);
  const codeClassName = useMemo(() => {
    return normalizedLanguage ? `language-${normalizedLanguage}` : undefined;
  }, [normalizedLanguage]);

  useEffect(() => {
    const el = codeElRef.current;
    if (!el) return;

    // Prevent highlight.js from skipping re-highlighting when content changes.
    // highlight.js marks elements as highlighted via `data-highlighted="yes"`.
    el.removeAttribute("data-highlighted");

    hljs.highlightElement(el);
  }, [code, normalizedLanguage]);

  return (
    <pre className={className}>
      <code ref={codeElRef} className={codeClassName}>
        {code}
      </code>
    </pre>
  );
}
