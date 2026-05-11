import styled from "styled-components";

export const StyledSidebar = styled.nav`
  width: 240px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

export const StyledNavItem = styled.button<{ $isActive: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#1f2937")};
  font-weight: ${({ $isActive }) => ($isActive ? "800" : "500")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;

  p {
    margin: 0;
    color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#1f2937")};
    font-weight: inherit;
  }

  &:hover {
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary : theme.colors.gray100};
  }
`;
