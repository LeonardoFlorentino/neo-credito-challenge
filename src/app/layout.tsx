import type { Metadata } from "next";
import { Providers } from "./providers";
import StyledComponentsRegistry from "./registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo Crédito — Validação Operacional",
  description: "Plataforma de validação e auditoria de propostas de crédito da Neo Crédito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
