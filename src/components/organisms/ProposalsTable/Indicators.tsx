import styled, { keyframes } from "styled-components";

export const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(242, 183, 5, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(242, 183, 5, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(242, 183, 5, 0);
  }
`;

export const StatusIndicator = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f2b705;
  box-shadow: 0 0 0 0 rgba(242, 183, 5, 0.7);
  animation: ${pulse} 1.2s infinite;
`;

export const NewIndicator = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 10px;
  font-weight: 700;
  border-radius: 8px;
  padding: 2px 6px;
`;

export const ProposalCellContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;
`;
