"use client";

import { createContext, use, useState } from "react";

type AppReadyContextType = {
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
};

const AppReadyContext = createContext<AppReadyContextType | undefined>(
  undefined,
);

type AppReadyProviderProps = {
  children: React.ReactNode;
};

export function AppReadyProvider({ children }: AppReadyProviderProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <AppReadyContext.Provider value={{ isReady, setIsReady }}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  const context = use(AppReadyContext);
  if (!context) {
    throw new Error("useAppReady must be used within AppReadyProvider");
  }
  return context;
}
