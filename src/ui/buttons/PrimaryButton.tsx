import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = {
  children: ReactNode;
  href: string;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type LinkProps = {
  children: ReactNode;
  to: ComponentProps<typeof Link>["to"];
  className?: string;
} & Omit<ComponentProps<typeof Link>, "to" | "className" | "children">;

type PrimaryButtonProps = ButtonProps | AnchorProps | LinkProps;

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-pill border border-transparent bg-aqua-400 px-5 py-3 text-sm font-semibold tracking-wide text-ocean-900 shadow-elevated transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300 disabled:cursor-not-allowed disabled:opacity-60";

export function PrimaryButton(props: PrimaryButtonProps) {
  if ("to" in props && props.to !== undefined) {
    const { children, className, to, ...rest } = props;
    return (
      <Link to={to} className={`${baseClassName} ${className ?? ""}`} {...rest}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { children, className, href, ...rest } = props;
    return (
      <a href={href} className={`${baseClassName} ${className ?? ""}`} {...rest}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonProps;
  const { children, className, type = "button", ...rest } = buttonProps;

  return (
    <button type={type} className={`${baseClassName} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
