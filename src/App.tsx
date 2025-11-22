import { useState } from "react";
import { useTranslation } from "./i18n";
import { AppRoutes } from "./router";
import { AppHeader } from "./ui/layout/app-shell/AppHeader";
import { MobileMenu } from "./ui/layout/app-shell/MobileMenu";
import { LoginIcon, LogoutIcon, PostsIcon } from "./ui/layout/app-shell/NavIcons";
import type { NavLinkItem } from "./ui/layout/app-shell/navigationTypes";
import "./ui/layout/app-shell/AppShell.css";

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const brandLabel = t("app.brand.title");
  const languageLabel = t("ui.language.label");

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const mobileMenuId = "app-mobile-menu";

  const primaryLinks: NavLinkItem[] = [
    { to: "/posts", label: t("ui.nav.posts"), icon: <PostsIcon /> },
  ];

  return (
    <div className="app-shell">
      <AppHeader
        brandLabel={brandLabel}
        menuLabel={t("ui.nav.menu")}
        primaryLinks={primaryLinks}
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
        themeLabel={t("ui.theme.label")}
        languageLabel={languageLabel}
        primaryLinks={primaryLinks}
        onClose={closeMenu}
        menuId={mobileMenuId}
      />
    </div>
  );
}

export default App;
