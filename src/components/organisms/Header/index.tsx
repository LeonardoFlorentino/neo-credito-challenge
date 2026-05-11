"use client";

import { Typography } from "@/components/atoms/Typography";
import {
  StyledHeader,
  StyledLogo,
  StyledProfile,
  StyledAvatar,
  StyledProfileInfo,
} from "./styles";

export function Header() {
  return (
    <StyledHeader>
      <StyledLogo>
        <Typography variant="h2">Neo Crédito</Typography>
      </StyledLogo>
      <StyledProfile>
        <StyledAvatar>JD</StyledAvatar>
        <StyledProfileInfo>
          <Typography variant="body">João da Silva</Typography>
          <Typography variant="caption">Operador CORBAN</Typography>
        </StyledProfileInfo>
      </StyledProfile>
    </StyledHeader>
  );
}
