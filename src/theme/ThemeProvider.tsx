import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { loadStoredTheme, persistTheme } from "./themeStorage";
import type { ResolvedTheme, ThemeMode } from "./themeTypes";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialResolvedTheme(): ResolvedTheme {
  if (typeof document === "undefined") {
    return "dark";
  }
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

function resolveTheme(mode: ThemeMode, systemTheme: ResolvedTheme): ResolvedTheme {
  return mode === "system" ? systemTheme : mode;
}

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
}

const THEME_TRANSITION_MS = 240;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(getInitialResolvedTheme());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme());
  const [ready, setReady] = useState(false);
  const transitionTimeout = useRef<number | undefined>(undefined);
  const hydrated = useRef(false);

  useEffect(() => {
    const stored = loadStoredTheme();
    const initialMode = stored ?? "system";
    const currentSystem = getSystemTheme();
    const initialResolved = resolveTheme(initialMode, currentSystem);

    setModeState(initialMode);
    setSystemTheme(currentSystem);
    setResolvedTheme(initialResolved);
    applyTheme(initialResolved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const nextResolved = resolveTheme(mode, systemTheme);

    if (!hydrated.current) {
      hydrated.current = true;
      setResolvedTheme(nextResolved);
      applyTheme(nextResolved);
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.clearTimeout(transitionTimeout.current);
    transitionTimeout.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, THEME_TRANSITION_MS + 50);

    setResolvedTheme(nextResolved);
    applyTheme(nextResolved);
  }, [mode, systemTheme, ready]);

  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      const next = event.matches ? "dark" : "light";
      setSystemTheme(next);
    };
    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    persistTheme(mode);
  }, [mode, ready]);

  useEffect(
    () => () => {
      window.clearTimeout(transitionTimeout.current);
    },
    []
  );

  const setMode = (next: ThemeMode) => {
    setModeState(next);
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      setMode,
    }),
    [mode, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return ctx;
}
