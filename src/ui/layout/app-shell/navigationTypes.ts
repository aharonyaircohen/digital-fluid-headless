import type { ReactNode } from "react";

export type NavLinkItem = {
  to: string;
  label: string;
  icon?: ReactNode;
};

export type AuthAction =
  | {
      type: "login";
      label: string;
      to: string;
      icon?: ReactNode;
    }
  | {
      type: "logout";
      label: string;
      onLogout: () => void | Promise<void>;
      icon?: ReactNode;
    };
