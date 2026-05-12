"use client";

import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import {
  StyledBackdrop,
  StyledMainLayout,
  StyledContainer,
  StyledContent,
} from "./styles";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const applyLayoutMode = (event: MediaQueryList | MediaQueryListEvent) => {
      const matches = event.matches;
      setIsMobile(matches);
      setIsSidebarOpen(!matches);
    };

    applyLayoutMode(mediaQuery);

    const handleChange = (event: MediaQueryListEvent) => {
      applyLayoutMode(event);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  const handleNavigate = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <StyledMainLayout>
      <Header onToggleSidebar={handleToggleSidebar} />
      <StyledContainer>
        <Sidebar isOpen={isSidebarOpen} onNavigate={handleNavigate} />
        <StyledBackdrop
          $isVisible={isMobile && isSidebarOpen}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
        <StyledContent>{children}</StyledContent>
      </StyledContainer>
    </StyledMainLayout>
  );
}
