import styled from "styled-components";

export const StyledSidebar = styled.nav<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? "240px" : "72px")};
  min-width: ${({ $isOpen }) => ($isOpen ? "240px" : "72px")};
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  transition: width 0.2s ease, min-width 0.2s ease, transform 0.2s ease;

  @media (max-width: 900px) {
    position: fixed;
    top: 73px;
    left: 0;
    bottom: 0;
    z-index: 60;
    width: 240px;
    min-width: 240px;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledNavItem = styled.button<{
  $isActive: boolean;
  $isSidebarOpen: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "flex-start" : "center")};
  gap: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "10px" : "0")};
  padding: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "12px 16px" : "12px")};
  border: 1px solid transparent;
  border-radius: 6px;
  background: ${({ $isActive, theme }) =>
    $isActive
      ? theme.mode === "light"
        ? "linear-gradient(135deg, #5762cb 0%, #7e87df 100%)"
        : "linear-gradient(135deg, #4f5fd8 0%, #6f6dff 100%)"
      : "transparent"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.onPrimary : theme.colors.text};
  font-weight: ${({ $isActive }) => ($isActive ? "800" : "500")};
  box-shadow: ${({ $isActive, theme }) =>
    $isActive
      ? theme.mode === "light"
        ? "0 6px 16px rgba(71, 88, 149, 0.24)"
        : "0 6px 16px rgba(79, 95, 216, 0.28)"
      : "none"};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;

  p {
    margin: 0;
    color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.onPrimary : theme.colors.text};
    font-weight: inherit;
  }

  &:hover {
    background: ${({ $isActive, theme }) =>
      $isActive
        ? theme.mode === "light"
          ? "linear-gradient(135deg, #4f5bc2 0%, #727bd7 100%)"
          : "linear-gradient(135deg, #4a58cc 0%, #6664f4 100%)"
        : theme.colors.gray100};
  }

  @media (max-width: 900px) {
    justify-content: flex-start;
    gap: 10px;
    padding: 12px 16px;
  }
`;
