"use client";

import { Menu, MoonStar, SunMedium } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import { useThemeMode } from "@/styles/ThemeProvider";
import {
  StyledHeader,
  StyledLogo,
  StyledMenuToggle,
  StyledProfile,
  StyledAvatar,
  StyledProfileInfo,
  StyledThemeToggle,
} from "./styles";

type HeaderProps = {
  onToggleSidebar: () => void;
};

export function Header({ onToggleSidebar }: HeaderProps) {
  const { mode, toggleMode } = useThemeMode();
  const isLightMode = mode === "light";

  return (
    <StyledHeader>
      <StyledLogo>
        <StyledMenuToggle
          type="button"
          onClick={onToggleSidebar}
          aria-label="Expandir ou retrair menu lateral"
          title="Expandir ou retrair menu lateral"
        >
          <Menu size={18} aria-hidden="true" />
        </StyledMenuToggle>
        <Typography variant="h2">Neo Crédito</Typography>
      </StyledLogo>
      <StyledProfile>
        <StyledThemeToggle
          type="button"
          onClick={toggleMode}
          aria-label={isLightMode ? "Ativar modo escuro" : "Ativar modo claro"}
          title={isLightMode ? "Ativar modo escuro" : "Ativar modo claro"}
        >
          {isLightMode ? (
            <MoonStar size={16} aria-hidden="true" />
          ) : (
            <SunMedium size={16} aria-hidden="true" />
          )}
        </StyledThemeToggle>
        <StyledAvatar>JD</StyledAvatar>
        <StyledProfileInfo>
          <Typography variant="body">João da Silva</Typography>
          <Typography variant="caption">Operador CORBAN</Typography>
        </StyledProfileInfo>
      </StyledProfile>
    </StyledHeader>
  );
}
