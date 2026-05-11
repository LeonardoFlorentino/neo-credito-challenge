"use client";

import type { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { GlobalStyles } from "./GlobalStyles";
import { theme } from "./theme";

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
}
