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

export const MiniMapIframe = styled.iframe`
  width: 100%;
  height: 220px;
  border: 0;
`;

export const MiniMapLegend = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 12px;
`;
