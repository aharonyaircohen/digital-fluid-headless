import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "surface" | "plain";
  style?: React.CSSProperties;
};

export function SectionShell({ id, children, className, variant = "surface", style }: SectionShellProps) {
  const baseClassName = `section-block ${variant === "surface" ? "gradient-surface" : ""} ${className ?? ""}`;

  return (
    <section id={id} className={baseClassName.trim()} style={style}>
      {children}
    </section>
  );
}
