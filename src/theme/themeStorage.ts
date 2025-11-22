import type { ThemeMode } from "./themeTypes";

const THEME_STORAGE_KEY = "ui-theme-preference";

export function loadStoredTheme(): ThemeMode | null {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export function persistTheme(mode: ThemeMode) {
  try {
    if (mode === "system") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  } catch {
    // ignore; persistence is optional
  }
}

export function getStorageKey() {
  return THEME_STORAGE_KEY;
}
