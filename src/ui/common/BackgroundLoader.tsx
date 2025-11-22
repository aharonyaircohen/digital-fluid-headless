type BackgroundLoaderProps = {
  label: string;
  className?: string;
};

export function BackgroundLoader({ label, className }: BackgroundLoaderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[color:var(--theme-border-soft)] bg-[color:var(--theme-section-background)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)] ${className ?? ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 bg-[var(--surface-glow-1),var(--surface-glow-2)]" />
      <div className="relative flex flex-col items-center justify-center gap-4 py-8 text-[color:var(--theme-text-primary)]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--neutral-d-600)]/70 border-t-transparent" aria-hidden="true" />
        <p className="text-sm font-medium text-[color:var(--neutral-d-600)]">{label}</p>
      </div>
    </div>
  );
}
