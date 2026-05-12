import styled from "styled-components";

type LoadingScreenStyledProps = {
  $isVisible: boolean;
};

export const StyledLoadingScreen = styled.div<LoadingScreenStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5f63d3 0%, #3d41a8 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
  transition: opacity 0.4s ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StyledLoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const StyledLoadingLogo = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-align: center;
  letter-spacing: -0.5px;
`;

export const StyledSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    border-top-color: white;
  }
`;

export const StyledLoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
  font-weight: 500;
`;
