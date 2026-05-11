import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";

import { AppThemeProvider } from "@/styles/ThemeProvider";

function Wrapper({ children }: { children: ReactNode }) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}

export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: Wrapper, ...options });
}
