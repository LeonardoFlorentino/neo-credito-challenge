"use client";

import { useEffect } from "react";
import styled from "styled-components";

import { LoadingScreen } from "@/components/organisms/LoadingScreen";
import { AppReadyProvider, useAppReady } from "@/contexts/AppReadyContext";
import { AppThemeProvider } from "@/styles/ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

const RootWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

type AppContentWrapperProps = {
  $isReady: boolean;
};

const AppContentWrapper = styled.div<AppContentWrapperProps>`
  display: ${(props) => (props.$isReady ? "block" : "none !important")};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

function ProvidersContent({ children }: ProvidersProps) {
  const { isReady, setIsReady } = useAppReady();

  useEffect(() => {
    void import("@/services/mocks/browser").then(({ startMockServiceWorker }) => {
      return startMockServiceWorker();
    });

    // Mark app as ready after a minimal delay to ensure render
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [setIsReady]);

  return (
    <RootWrapper>
      <LoadingScreen isVisible={!isReady} />
      <AppThemeProvider>
        <AppContentWrapper $isReady={isReady}>{children}</AppContentWrapper>
      </AppThemeProvider>
    </RootWrapper>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppReadyProvider>
      <ProvidersContent>{children}</ProvidersContent>
    </AppReadyProvider>
  );
}
