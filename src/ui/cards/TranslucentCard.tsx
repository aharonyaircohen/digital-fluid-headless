import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import "./TranslucentCard.css";

type TranslucentCardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function TranslucentCard<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: TranslucentCardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const baseClassName = "translucent-card";

  return (
    <Component className={`${baseClassName} ${className ?? ""}`} {...rest}>
      {children}
    </Component>
  );
}
