import { StyledBadge } from "./styles";

type BadgeVariant = "success" | "warning" | "neutral";

type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}
