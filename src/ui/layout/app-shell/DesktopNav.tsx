import { Link } from "react-router-dom";
import type { AuthAction, NavLinkItem } from "./navigationTypes";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeSelector } from "./ThemeSelector";
import "./DesktopNav.css";

type DesktopNavProps = {
  primaryLinks: NavLinkItem[];
  accountLink?: NavLinkItem;
  authAction: AuthAction;
  menuLabel: string;
};

export function DesktopNav({ primaryLinks, accountLink, authAction, menuLabel }: DesktopNavProps) {
  return (
    <nav className="desktop-nav" aria-label={menuLabel}>
      <div className="desktop-nav__links">
        {primaryLinks.map((link) => (
          <Link key={link.to} to={link.to} className="desktop-nav__link">
            {link.label}
          </Link>
        ))}
        {accountLink ? (
          <Link to={accountLink.to} className="desktop-nav__link">
            {accountLink.label}
          </Link>
        ) : null}
        {authAction.type === "login" ? (
          <Link to={authAction.to} className="desktop-nav__link desktop-nav__link--accent">
            {authAction.label}
          </Link>
        ) : (
          <button type="button" className="desktop-nav__button" onClick={() => void authAction.onLogout()}>
            {authAction.label}
          </button>
        )}
      </div>
      <div className="desktop-nav__controls">
        <LanguageSelector />
        <ThemeSelector />
      </div>
    </nav>
  );
}
