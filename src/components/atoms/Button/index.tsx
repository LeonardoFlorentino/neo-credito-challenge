import { forwardRef, type ButtonHTMLAttributes } from "react";

import { StyledButton } from "./styles";

type ButtonVariant = "primary" | "secondary" | "ghost" | "success";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", loading = false, disabled = false, ...props },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $loading={loading}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? "Carregando..." : children}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";
