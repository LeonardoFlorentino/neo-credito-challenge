"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { GlobalStyles } from "./GlobalStyles";
import { themes, type ThemeMode } from "./theme";

const STORAGE_KEY = "neo-theme-mode";

type ThemeModeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedMode = window.localStorage.getItem(STORAGE_KEY);

    return storedMode === "dark" ? "dark" : "light";
  });

  const toggleMode = useCallback(() => {
    setMode((previousMode) => {
      const nextMode: ThemeMode = previousMode === "light" ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, nextMode);

      return nextMode;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ mode, toggleMode }),
    [mode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={themes[mode]}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within AppThemeProvider");
  }

  return context;
}
