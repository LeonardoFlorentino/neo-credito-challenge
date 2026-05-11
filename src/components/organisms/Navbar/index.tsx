import type { ReactNode } from "react";

import { Brand, Wrapper } from "./styles";

type NavbarProps = {
  actions?: ReactNode;
};

export function Navbar({ actions }: NavbarProps) {
  return (
    <Wrapper>
      <Brand>Neo Credito</Brand>
      {actions}
    </Wrapper>
  );
}
