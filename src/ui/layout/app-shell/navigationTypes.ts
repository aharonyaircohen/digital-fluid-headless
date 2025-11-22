import type { ReactNode } from "react";

export type NavLinkItem = {
  to: string;
  label: string;
  icon?: ReactNode;
};
