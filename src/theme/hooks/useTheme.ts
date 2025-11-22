import { useMemo } from "react";
import { useThemeContext } from "../ThemeProvider";
import type { ThemeMode } from "../themeTypes";

export function useTheme() {
  const { mode, resolvedTheme, setMode } = useThemeContext();

  const setThemeMode = (nextMode: ThemeMode) => {
    setMode(nextMode);
  };

  return useMemo(
    () => ({
      mode,
      resolvedTheme,
      setMode: setThemeMode,
    }),
    [mode, resolvedTheme]
  );
}
