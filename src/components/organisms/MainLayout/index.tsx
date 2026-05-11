"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import {
  StyledMainLayout,
  StyledContainer,
  StyledContent,
} from "./styles";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <StyledMainLayout>
      <Header />
      <StyledContainer>
        <Sidebar />
        <StyledContent>{children}</StyledContent>
      </StyledContainer>
    </StyledMainLayout>
  );
}
