import { Link } from "react-router-dom";
import { useLocale } from "../../../i18n";
import { DesktopNav } from "./DesktopNav";
import { MenuIcon } from "./NavIcons";
import type { AuthAction, NavLinkItem } from "./navigationTypes";
import "./AppHeader.css";

type AppHeaderProps = {
  brandLabel: string;
  menuLabel: string;
  primaryLinks: NavLinkItem[];
  accountLink?: NavLinkItem;
  authAction: AuthAction;
  onMenuOpen: () => void;
  isMenuOpen: boolean;
  onBrandClick?: () => void;
  menuId?: string;
};

export function AppHeader({
  brandLabel,
  menuLabel,
  primaryLinks,
  accountLink,
  authAction,
  onMenuOpen,
  isMenuOpen,
  onBrandClick,
  menuId,
}: AppHeaderProps) {
  const { direction } = useLocale();

  return (
    <header className="app-header" dir={direction}>
      <div className="page-container app-header__bar">
        <Link to="/" className="app-header__brand" onClick={onBrandClick}>
          {brandLabel}
        </Link>
        <div className="app-header__actions">
          <DesktopNav
            primaryLinks={primaryLinks}
            accountLink={accountLink}
            authAction={authAction}
            menuLabel={menuLabel}
          />
          <button
            type="button"
            className="app-header__menu-button"
            onClick={onMenuOpen}
            aria-label={menuLabel}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
