"use client";

import { useEffect } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    void import("@/services/mocks/browser").then(({ startMockServiceWorker }) => {
      return startMockServiceWorker();
    });
  }, []);

  return <>{children}</>;
}
