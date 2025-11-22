import type { SVGProps } from "react";

type GeometricShape = "triangle" | "circle" | "square";

type GeometricIconProps = {
  shape: GeometricShape;
  size?: number;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "width" | "height">;

export function GeometricIcon({ shape, size = 28, className, ...rest }: GeometricIconProps) {
  const common = {
    className: className ?? "text-aqua-300",
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
  } satisfies SVGProps<SVGSVGElement>;

  if (shape === "triangle") {
    return (
      <svg {...common} {...rest}>
        <path d="M16 5.5 26.5 24H5.5Z" />
      </svg>
    );
  }

  if (shape === "circle") {
    return (
      <svg {...common} {...rest}>
        <circle cx={16} cy={16} r={10} />
      </svg>
    );
  }

  return (
    <svg {...common} {...rest}>
      <rect x={7} y={7} width={18} height={18} rx={4} ry={4} />
    </svg>
  );
}
