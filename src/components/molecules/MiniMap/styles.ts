import styled from "styled-components";

export const MiniMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  min-height: 0;
`;

export const MiniMapFrame = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 180px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) =>
    `linear-gradient(160deg, ${theme.colors.gray100}, ${theme.colors.gray200})`};
`;

export const MiniMapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

export const MiniMapLegend = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 12px;
`;
