import styled from "styled-components";

export const ViewerContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ViewerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EvidenceCard = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: zoom-in;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const EvidenceLabel = styled.span`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

export const EvidenceImage = styled.img`
  width: 100%;
  height: 220px;
  border-radius: 8px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.gray100};
`;

export const ZoomOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: ${({ $open }) => ($open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.75);
  padding: 24px;
`;

export const ZoomPanel = styled.div`
  width: min(1000px, 92vw);
  max-height: 90vh;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const ZoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const ZoomTitle = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

export const ZoomClose = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.gray700};
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;

export const ZoomImage = styled.img`
  width: 100%;
  max-height: calc(90vh - 70px);
  object-fit: contain;
  background: ${({ theme }) => theme.colors.gray100};
`;
