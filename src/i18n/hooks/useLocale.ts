import { useContext } from "react";
import type { Locale } from "../config/types";
import { LanguageContext } from "../providers/LanguageProvider";

export function useLocale(): { locale: Locale; direction: "rtl" | "ltr"; setLocale: (next: Locale) => void } {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLocale must be used within a LanguageProvider");
  }

  return context;
}
