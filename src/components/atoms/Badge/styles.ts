import styled, { css } from "styled-components";

type BadgeVariant = "success" | "warning" | "neutral";

export const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  border-radius: 9999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;

  ${({ $variant }) =>
    $variant === "success" &&
    css`
      background: #d1fae5;
      color: #065f46;
    `}

  ${({ $variant }) =>
    $variant === "warning" &&
    css`
      background: #fef3c7;
      color: #92400e;
    `}

  ${({ $variant }) =>
    $variant === "neutral" &&
    css`
      background: #e5e7eb;
      color: #374151;
    `}
`;
