import styled from "styled-components";

export const MiniMapContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const MiniMapFrame = styled.div`
  position: relative;
  width: 100%;
  min-height: 180px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) =>
    `linear-gradient(160deg, ${theme.colors.gray100}, ${theme.colors.gray200})`};
`;

export const MiniMapGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(17, 24, 39, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 24, 39, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
`;

export const MiniMapMarker = styled.span<{ $top: number; $left: number }>`
  position: absolute;
  top: ${({ $top }) => `${$top}%`};
  left: ${({ $left }) => `${$left}%`};
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.onSecondary};
  box-shadow: 0 0 0 4px rgba(242, 183, 5, 0.25);
  transform: translate(-50%, -50%);
`;

export const MiniMapLegend = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 12px;
`;
