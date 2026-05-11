import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const StyledSkeleton = styled.span<{
  $width?: string;
  $height?: string;
  $radius?: string;
}>`
  display: block;
  width: ${({ $width }) => $width ?? "100%"};
  height: ${({ $height }) => $height ?? "16px"};
  border-radius: ${({ $radius }) => $radius ?? "8px"};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray200} 25%,
    ${({ theme }) => theme.colors.gray100} 37%,
    ${({ theme }) => theme.colors.gray200} 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;
