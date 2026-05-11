import { ProposalStatus } from "@/types/Proposal";
import { StyledBadge } from "./styles";

type BadgeVariant = ProposalStatus | "neutral";

type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}
