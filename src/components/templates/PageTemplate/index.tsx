import type { ReactNode } from "react";

import { Navbar } from "@/components/organisms/Navbar";

import { Container, Content } from "./styles";

type PageTemplateProps = {
  children: ReactNode;
};

export function PageTemplate({ children }: PageTemplateProps) {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
    </Container>
  );
}
