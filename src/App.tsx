import { useState } from "react";
import { useTranslation } from "./i18n";
import { useAuth } from "./auth/AuthContext";
import { AppRoutes } from "./router";
import { AppHeader } from "./ui/layout/app-shell/AppHeader";
import { MobileMenu } from "./ui/layout/app-shell/MobileMenu";
import { AccountIcon, CoursesIcon, LoginIcon, LogoutIcon, PostsIcon } from "./ui/layout/app-shell/NavIcons";
import type { AuthAction, NavLinkItem } from "./ui/layout/app-shell/navigationTypes";
import "./ui/layout/app-shell/AppShell.css";

function App() {
  const { t } = useTranslation();
  const { viewer, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const brandLabel = t("app.brand.title");
  const languageLabel = t("ui.language.label");

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  const mobileMenuId = "app-mobile-menu";

  const primaryLinks: NavLinkItem[] = [
    { to: "/posts", label: t("ui.nav.posts"), icon: <PostsIcon /> },
    { to: "/courses", label: t("ui.nav.courses"), icon: <CoursesIcon /> },
  ];

  const accountLink = viewer ? { to: "/account", label: t("ui.nav.account"), icon: <AccountIcon /> } : undefined;

  const authAction: AuthAction = viewer
    ? { type: "logout", label: t("ui.nav.logout"), onLogout: handleLogout, icon: <LogoutIcon /> }
    : { type: "login", label: t("ui.nav.login"), to: "/login", icon: <LoginIcon /> };

  return (
    <div className="app-shell">
      <AppHeader
        brandLabel={brandLabel}
        menuLabel={t("ui.nav.menu")}
        primaryLinks={primaryLinks}
        accountLink={accountLink}
        authAction={authAction}
        onMenuOpen={openMenu}
        isMenuOpen={isMenuOpen}
        onBrandClick={closeMenu}
        menuId={mobileMenuId}
      />

      <main className="app-shell__main page-container">
        <AppRoutes />
      </main>

      <MobileMenu
        isOpen={isMenuOpen}
        brandLabel={brandLabel}
        menuLabel={t("ui.nav.menu")}
        accountLabel={t("ui.nav.account")}
        themeLabel={t("ui.theme.label")}
        languageLabel={languageLabel}
        primaryLinks={primaryLinks}
        accountLink={accountLink}
        authAction={authAction}
        onClose={closeMenu}
        menuId={mobileMenuId}
      />
    </div>
  );
}

export default App;
