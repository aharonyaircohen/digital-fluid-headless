import { useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE } from "../config/i18n";
import type { Locale } from "../config/types";
import { getTranslations } from "../services/translationLoader";
import { useLocale } from "./useLocale";

type TranslationDictionary = Record<string, string>;

function interpolate(template: string, variables?: Record<string, string | number>): string {
  if (!variables) return template;

  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{{\s*${key}\s*}}`, "g"), String(value));
  }, template);
}

export function useTranslation() {
  const { locale } = useLocale();
  const [translationDictionary, setTranslationDictionary] = useState<TranslationDictionary>({});
  const [fallbackDictionary, setFallbackDictionary] = useState<TranslationDictionary>({});

  useEffect(() => {
    getTranslations(locale).then(setTranslationDictionary).catch(() => setTranslationDictionary({}));
  }, [locale]);

  useEffect(() => {
    getTranslations(DEFAULT_LOCALE).then(setFallbackDictionary).catch(() => setFallbackDictionary({}));
  }, []);

  const translate = useMemo(
    () =>
      (key: string, variables?: Record<string, string | number>): string => {
        const value = translationDictionary[key] ?? fallbackDictionary[key];

        if (!value) {
          console.warn(`[i18n] MISSING KEY: ${key}`);
          return `MISSING KEY: [${key}]`;
        }

        return interpolate(value, variables);
      },
    [fallbackDictionary, translationDictionary]
  );

  return { t: translate, locale: locale as Locale };
}
