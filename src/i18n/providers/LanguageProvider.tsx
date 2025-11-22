import { createContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../config/i18n";
import type { Locale } from "../config/types";

type LanguageContextValue = {
  locale: Locale;
  direction: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem("user-locale");
  if (stored && stored in SUPPORTED_LOCALES) {
    return stored as Locale;
  }

  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale);

  const direction = SUPPORTED_LOCALES[locale]?.direction ?? SUPPORTED_LOCALES[DEFAULT_LOCALE].direction;

  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    html.lang = locale;
    html.dir = direction;
  }, [direction, locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem("user-locale", locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      direction,
      setLocale: (nextLocale) => {
        if (SUPPORTED_LOCALES[nextLocale]) {
          setLocale(nextLocale);
        }
      },
    }),
    [locale, direction]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
