import type { ButtonHTMLAttributes } from "react";

import { StyledButton } from "./styles";

type ButtonVariant = "primary" | "secondary" | "ghost" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </StyledButton>
  );
}
