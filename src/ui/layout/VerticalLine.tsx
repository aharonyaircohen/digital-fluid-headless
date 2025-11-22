type VerticalLineProps = {
  className?: string;
  heightClassName?: string;
};

export function VerticalLine({ className, heightClassName }: VerticalLineProps) {
  return (
    <div className={`relative flex w-px justify-center ${className ?? ""}`}>
      <span
        className={`absolute inset-y-0 w-px bg-gradient-to-b from-gold-300/20 via-gold-400/30 to-gold-500/40 shadow-elevated ${
          heightClassName ?? "h-full"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
