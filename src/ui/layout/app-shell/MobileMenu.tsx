import { Link } from "react-router-dom";
import type { AuthAction, NavLinkItem } from "./navigationTypes";
import { CloseIcon } from "./NavIcons";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeSelector } from "./ThemeSelector";
import { useLocale } from "../../../i18n";
import "./MobileMenu.css";

type MobileMenuProps = {
  isOpen: boolean;
  brandLabel: string;
  menuLabel: string;
  primaryLinks: NavLinkItem[];
  accountLink?: NavLinkItem;
  authAction: AuthAction;
  onClose: () => void;
  accountLabel: string;
  menuId?: string;
  themeLabel: string;
  languageLabel: string;
};

export function MobileMenu({
  isOpen,
  brandLabel,
  menuLabel,
  primaryLinks,
  accountLink,
  authAction,
  onClose,
  accountLabel,
  menuId,
  themeLabel,
  languageLabel,
}: MobileMenuProps) {
  const { direction } = useLocale();

  return (
    <>
      <div className={`mobile-menu__overlay ${isOpen ? "is-open" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside
        id={menuId}
        className={`mobile-menu ${isOpen ? "is-open" : ""}`}
        dir={direction}
        aria-hidden={!isOpen}
        aria-label={menuLabel}
        role="dialog"
      >
        <div className="mobile-menu__header">
          <div className="mobile-menu__meta">
            <span className="mobile-menu__micro">{menuLabel}</span>
            <span className="mobile-menu__brand">{brandLabel}</span>
          </div>
          <button type="button" className="mobile-menu__close" onClick={onClose} aria-label={menuLabel}>
            <CloseIcon />
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <div className="mobile-menu__section">
            <span className="mobile-menu__section-label">{menuLabel}</span>
            <div className="mobile-menu__links">
              {primaryLinks.map((link) => (
                <Link key={link.to} to={link.to} className="mobile-menu__link" onClick={onClose}>
                  {link.icon ? <span className="mobile-menu__icon">{link.icon}</span> : null}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mobile-menu__divider" />

          <div className="mobile-menu__section">
            <span className="mobile-menu__section-label">{accountLabel}</span>
            <div className="mobile-menu__links">
              {accountLink ? (
                <Link to={accountLink.to} className="mobile-menu__link" onClick={onClose}>
                  {accountLink.icon ? <span className="mobile-menu__icon">{accountLink.icon}</span> : null}
                  <span>{accountLink.label}</span>
                </Link>
              ) : null}
              {authAction.type === "login" ? (
                <Link to={authAction.to} className="mobile-menu__link" onClick={onClose}>
                  {authAction.icon ? <span className="mobile-menu__icon">{authAction.icon}</span> : null}
                  <span>{authAction.label}</span>
                </Link>
              ) : (
                <button type="button" className="mobile-menu__link mobile-menu__link--button" onClick={() => void authAction.onLogout()}>
                  {authAction.icon ? <span className="mobile-menu__icon">{authAction.icon}</span> : null}
                  <span>{authAction.label}</span>
                </button>
              )}
            </div>
          </div>

          <div className="mobile-menu__section">
            <span className="mobile-menu__section-label">{languageLabel}</span>
            <LanguageSelector variant="menu" showLabel={false} />
          </div>

          <div className="mobile-menu__section">
            <span className="mobile-menu__section-label">{themeLabel}</span>
            <ThemeSelector variant="menu" />
          </div>
        </nav>
      </aside>
    </>
  );
}
