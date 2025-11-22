import { useId } from "react";
import { SUPPORTED_LOCALES, type Locale, useLocale, useTranslation } from "../../../i18n";
import "./LanguageSelector.css";

type LanguageSelectorProps = {
  variant?: "compact" | "menu";
  showLabel?: boolean;
};

const localeOptions = Object.values(SUPPORTED_LOCALES);

export function LanguageSelector({ variant = "compact", showLabel = true }: LanguageSelectorProps) {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();
  const selectId = useId();

  return (
    <div className={`language-selector language-selector--${variant}`}>
      {showLabel ? (
        <label className="language-selector__label" htmlFor={selectId}>
          {t("ui.language.label")}
        </label>
      ) : null}

      <div className="language-selector__control">
        <select
          id={selectId}
          aria-label={t("ui.language.label")}
          value={locale}
          onChange={(event) => setLocale(event.target.value as Locale)}
          className="language-selector__select"
        >
          {localeOptions.map((option) => (
            <option key={option.locale} value={option.locale}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="language-selector__chevron" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
