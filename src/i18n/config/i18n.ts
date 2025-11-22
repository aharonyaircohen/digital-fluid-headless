import type { Direction, Locale, LocaleConfig } from "./types";

export const SUPPORTED_LOCALES: Record<Locale, LocaleConfig> = {
  he: { locale: "he", direction: "rtl", label: "עברית" },
  en: { locale: "en", direction: "ltr", label: "English" },
};

export const DEFAULT_LOCALE: Locale = "he";

export const DEFAULT_DIR: Direction = SUPPORTED_LOCALES[DEFAULT_LOCALE].direction;
