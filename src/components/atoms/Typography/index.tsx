import type { ElementType, HTMLAttributes, ReactNode } from "react";

import {
  StyledH1,
  StyledH2,
  StyledBody,
  StyledCaption,
} from "./styles";

type TypographyVariant = "h1" | "h2" | "body" | "caption";

type TypographyProps = HTMLAttributes<HTMLElement> & {
  variant?: TypographyVariant;
  children: ReactNode;
};

const variantMap: Record<TypographyVariant, ElementType> = {
  h1: StyledH1 as ElementType,
  h2: StyledH2 as ElementType,
  body: StyledBody as ElementType,
  caption: StyledCaption as ElementType,
};

export function Typography({
  variant = "body",
  children,
  ...props
}: TypographyProps) {
  const Component = variantMap[variant];
  return <Component {...props}>{children}</Component>;
}
