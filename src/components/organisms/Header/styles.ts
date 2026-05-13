import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px 16px 16px;
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "linear-gradient(90deg, #8188dc 0%, #98a0e9 100%)"
      : "linear-gradient(90deg, #1a2134 0%, #202942 65%, #2b3360 100%)"};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.mode === "light" ? "#a3aae8" : "rgba(166, 180, 205, 0.28)"};
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 2px 10px rgba(64, 78, 133, 0.2)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)"};
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h2 {
    margin: 0;
    color: ${({ theme }) =>
      theme.mode === "light" ? theme.colors.onPrimary : theme.colors.text};
    font-weight: 700;
  }
`;

export const StyledMenuToggle = styled.button`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.55)"
        : theme.colors.gray300};
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255, 255, 255, 0.18)"
      : "rgba(255, 255, 255, 0.04)"};
  color: ${({ theme }) =>
    theme.mode === "light" ? theme.colors.onPrimary : theme.colors.text};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#ffffff" : theme.colors.primary};
    color: ${({ theme }) =>
      theme.mode === "light" ? "#ffffff" : theme.colors.primary};
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.24)"
        : "rgba(111, 109, 255, 0.12)"};
  }
`;

export const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledThemeToggle = styled.button`
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.55)"
        : theme.colors.gray300};
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255, 255, 255, 0.18)"
      : "rgba(255, 255, 255, 0.04)"};
  color: ${({ theme }) =>
    theme.mode === "light" ? theme.colors.onPrimary : theme.colors.text};
  border-radius: 999px;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#ffffff" : theme.colors.primary};
    color: ${({ theme }) =>
      theme.mode === "light" ? "#ffffff" : theme.colors.primary};
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.24)"
        : "rgba(111, 109, 255, 0.12)"};
  }
`;

export const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "linear-gradient(135deg, #5966d0 0%, #808be0 100%)"
      : "linear-gradient(135deg, #5363d7 0%, #6f6dff 100%)"};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: 2px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.55)"
        : "rgba(255, 255, 255, 0.2)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
`;

export const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  p {
    margin: 0;
    color: ${({ theme }) =>
      theme.mode === "light" ? theme.colors.onPrimary : theme.colors.text};
  }

  span {
    margin: 0;
    color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.85)"
        : theme.colors.gray500};
  }
`;
