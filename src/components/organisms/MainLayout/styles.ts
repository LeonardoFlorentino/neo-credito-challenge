import styled from "styled-components";

export const StyledMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

export const StyledContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 900px) {
    padding: 16px;
  }
`;

export const StyledBackdrop = styled.div<{ $isVisible: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
    position: fixed;
    inset: 73px 0 0 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.35);
  }
`;
