import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../config/i18n";
import type { Locale } from "../config/types";

export async function getTranslations(locale: Locale): Promise<Record<string, string>> {
  if (!SUPPORTED_LOCALES[locale]) {
    return {};
  }

  try {
    const module = await import(`../translations/${locale}.json`);
    return module.default as Record<string, string>;
  } catch (error) {
    console.warn(`[i18n] Missing translations for locale '${locale}', falling back to default '${DEFAULT_LOCALE}'.`, error);
    if (locale !== DEFAULT_LOCALE) {
      try {
        const module = await import(`../translations/${DEFAULT_LOCALE}.json`);
        return module.default as Record<string, string>;
      } catch (fallbackError) {
        console.warn(`[i18n] Unable to load default locale translations '${DEFAULT_LOCALE}'.`, fallbackError);
      }
    }
    return {};
  }
}
