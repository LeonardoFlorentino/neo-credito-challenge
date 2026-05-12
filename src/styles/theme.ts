const baseTheme = {
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
};

type ThemeDefinition = {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    onPrimary: string;
    onSecondary: string;
    background: string;
    surface: string;
    text: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;
  };
  spacing: typeof baseTheme.spacing;
  mode: "light" | "dark";
};

export const neoLightTheme: ThemeDefinition = {
  colors: {
    primary: "#5f63d3",
    secondary: "#8b84e8",
    success: "#1f8a4d",
    danger: "#c0392b",
    onPrimary: "#ffffff",
    onSecondary: "#16233f",
    background: "#eef1f7",
    surface: "#ffffff",
    text: "#16233f",
    gray100: "#f7f9fc",
    gray200: "#e5eaf3",
    gray300: "#d1d9e7",
    gray400: "#9ca9c1",
    gray500: "#6f7f9e",
    gray600: "#526283",
    gray700: "#394a6a",
    gray800: "#253655",
    gray900: "#172643",
  },
  mode: "light",
  ...baseTheme,
};

export const neoDarkTheme: ThemeDefinition = {
  colors: {
    primary: "#6f6dff",
    secondary: "#9b8cff",
    success: "#2fbe8f",
    danger: "#ff6b6b",
    onPrimary: "#ffffff",
    onSecondary: "#11172b",
    background: "#0d1220",
    surface: "#171e31",
    text: "#e7ecf7",
    gray100: "#1d263b",
    gray200: "#293551",
    gray300: "#364668",
    gray400: "#61769d",
    gray500: "#8093b4",
    gray600: "#a6b4cd",
    gray700: "#c3cde0",
    gray800: "#dde4ef",
    gray900: "#f5f8fc",
  },
  mode: "dark",
  ...baseTheme,
};

export const themes = {
  light: neoLightTheme,
  dark: neoDarkTheme,
};

export type ThemeMode = keyof typeof themes;
export type AppTheme = ThemeDefinition;
