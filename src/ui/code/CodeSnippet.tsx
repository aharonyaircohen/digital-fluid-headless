import type { ReactNode } from "react";

type CodeSnippetProps = {
  children: ReactNode;
  className?: string;
};

export function CodeSnippet({ children, className }: CodeSnippetProps) {
  return (
    <pre
      className={`rounded-card border border-neutral-d-700/60 bg-ocean-900/80 px-4 py-3 text-sm text-neutral-d-50 shadow-elevated backdrop-blur-sm ${className ?? ""}`}
    >
      <code className="font-mono text-[13px] leading-relaxed text-neutral-d-100">{children}</code>
    </pre>
  );
}
