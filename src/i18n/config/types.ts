export type Locale = "he" | "en";

export type Direction = "rtl" | "ltr";

export interface LocaleConfig {
  locale: Locale;
  direction: Direction;
  label: string;
}
