import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "ghost";

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $loading: boolean;
}>`
  border: 0;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ $variant, theme }) =>
    $variant === "primary" &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.onPrimary};

      &:hover:not(:disabled) {
        opacity: 0.92;
      }
    `}

  ${({ $variant, theme }) =>
    $variant === "secondary" &&
    css`
      background: ${theme.colors.secondary};
      color: ${theme.colors.onSecondary};

      &:hover:not(:disabled) {
        opacity: 0.92;
      }
    `}

  ${({ $variant, theme }) =>
    $variant === "ghost" &&
    css`
      background: transparent;
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.gray300};

      &:hover:not(:disabled) {
        background: ${theme.colors.gray100};
        border-color: ${theme.colors.primary};
      }
    `}

  ${({ $loading }) =>
    $loading &&
    css`
      opacity: 0.7;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
