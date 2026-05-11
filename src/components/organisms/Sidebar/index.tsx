"use client";

import { usePathname, useRouter } from "next/navigation";
import { Typography } from "@/components/atoms/Typography";
import { StyledSidebar, StyledNavItem } from "./styles";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Painel CORBAN", href: "/painel" },
    { label: "Validação Operacional", href: "/validation" },
  ];

  return (
    <StyledSidebar>
      {navItems.map((item) => (
        <StyledNavItem
          key={item.href}
          $isActive={pathname === item.href}
          onClick={() => router.push(item.href)}
        >
          <Typography variant="body">{item.label}</Typography>
        </StyledNavItem>
      ))}
    </StyledSidebar>
  );
}
