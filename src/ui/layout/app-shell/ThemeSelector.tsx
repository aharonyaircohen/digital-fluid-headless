import type { JSX } from "react";
import { useTranslation } from "../../../i18n";
import { useTheme } from "../../../theme";
import type { ThemeMode } from "../../../theme";
import { MonitorIcon, MoonIcon, SunIcon } from "./NavIcons";
import "./ThemeSelector.css";

type ThemeSelectorProps = {
  variant?: "compact" | "menu";
};

const OPTIONS: { mode: ThemeMode; icon: JSX.Element; key: string }[] = [
  { mode: "system", icon: <MonitorIcon />, key: "ui.theme.system" },
  { mode: "light", icon: <SunIcon />, key: "ui.theme.light" },
  { mode: "dark", icon: <MoonIcon />, key: "ui.theme.dark" },
];

export function ThemeSelector({ variant = "compact" }: ThemeSelectorProps) {
  const { t } = useTranslation();
  const { mode, setMode } = useTheme();

  return (
    <div className={`theme-selector theme-selector--${variant}`} role="radiogroup" aria-label={t("ui.theme.label")}>
      {OPTIONS.map((option) => {
        const isActive = mode === option.mode;
        const optionClass = `theme-selector__option${isActive ? " is-active" : ""}`;
        return (
          <button
            key={option.mode}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={optionClass}
            onClick={() => setMode(option.mode)}
          >
            <span className="theme-selector__icon">{option.icon}</span>
            <span className="theme-selector__label">{t(option.key)}</span>
          </button>
        );
      })}
    </div>
  );
}
