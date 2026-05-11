import styled, { css } from "styled-components";
import { ProposalStatus } from "@/types/Proposal";

type BadgeVariant = ProposalStatus | "neutral";

const colorMap: Record<BadgeVariant, { bg: string; color: string }> = {
  [ProposalStatus.AGUARDANDO]: { bg: "#fef3c7", color: "#92400e" },
  [ProposalStatus.AGUARDANDO_AUDITORIA]: { bg: "#dbeafe", color: "#1e3a8a" },
  [ProposalStatus.ASSINADO]: { bg: "#d1fae5", color: "#065f46" },
  [ProposalStatus.RECUSADO]: { bg: "#fee2e2", color: "#7f1d1d" },
  [ProposalStatus.EXPIRADO]: { bg: "#e5e7eb", color: "#374151" },
  neutral: { bg: "#e5e7eb", color: "#374151" },
};

export const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-block;
  border-radius: 9999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;

  ${({ $variant }) => {
    const colors = colorMap[$variant];
    return css`
      background: ${colors.bg};
      color: ${colors.color};
    `;
  }}
`;
