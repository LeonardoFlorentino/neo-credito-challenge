import styled from "styled-components";

export const StyledH1 = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledH2 = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledBody = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledCaption = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.gray500};
`;
