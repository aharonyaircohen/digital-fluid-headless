import { Link } from "react-router-dom";
import type { NavLinkItem } from "./navigationTypes";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeSelector } from "./ThemeSelector";
import "./DesktopNav.css";

type DesktopNavProps = {
  primaryLinks: NavLinkItem[];
  menuLabel: string;
};

export function DesktopNav({ primaryLinks, menuLabel }: DesktopNavProps) {
  return (
    <nav className="desktop-nav" aria-label={menuLabel}>
      <div className="desktop-nav__links">
        {primaryLinks.map((link) => (
          <Link key={link.to} to={link.to} className="desktop-nav__link">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="desktop-nav__controls">
        <LanguageSelector />
        <ThemeSelector />
      </div>
    </nav>
  );
}
