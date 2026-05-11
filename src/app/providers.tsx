"use client";

import { useEffect } from "react";

import { AppThemeProvider } from "@/styles/ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    void import("@/services/mocks/browser").then(({ startMockServiceWorker }) => {
      return startMockServiceWorker();
    });
  }, []);

  return <AppThemeProvider>{children}</AppThemeProvider>;
}
