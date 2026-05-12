import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    width: 100%;
    min-height: 100%;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    line-height: 1.5;
    font-family: "Inter", "Roboto", "Segoe UI", sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    color-scheme: ${({ theme }) => theme.mode};
    --app-surface: ${({ theme }) => theme.colors.surface};
    --app-surface-soft: ${({ theme }) => theme.colors.gray100};
    --app-border: ${({ theme }) => theme.colors.gray200};
    --app-border-strong: ${({ theme }) => theme.colors.gray300};
    --app-text: ${({ theme }) => theme.colors.text};
    --app-text-soft: ${({ theme }) => theme.colors.gray600};
    --app-text-muted: ${({ theme }) => theme.colors.gray500};
    --app-link: ${({ theme }) => theme.colors.primary};
    --app-overlay: ${({ theme }) =>
      theme.mode === "dark" ? "rgba(8, 3, 26, 0.72)" : "rgba(17, 24, 39, 0.6)"};
    --app-focus: ${({ theme }) => theme.colors.primary};
    --app-success: ${({ theme }) => theme.colors.success};
    --app-danger: ${({ theme }) => theme.colors.danger};
    --app-on-success: ${({ theme }) =>
      theme.mode === "dark" ? "#081e14" : theme.colors.onPrimary};
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  ol {
    list-style: none;
  }
`;
