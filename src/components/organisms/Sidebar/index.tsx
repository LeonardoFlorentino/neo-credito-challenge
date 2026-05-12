"use client";

import { LayoutGrid, ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Typography } from "@/components/atoms/Typography";
import { StyledSidebar, StyledNavItem } from "./styles";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Painel CORBAN", href: "/painel", icon: LayoutGrid },
    { label: "Validação Operacional", href: "/validacao", icon: ShieldCheck },
  ];

  return (
    <StyledSidebar>
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <StyledNavItem
            key={item.href}
            $isActive={pathname === item.href}
            onClick={() => router.push(item.href)}
          >
            <Icon size={16} aria-hidden="true" />
            <Typography variant="body">{item.label}</Typography>
          </StyledNavItem>
        );
      })}
    </StyledSidebar>
  );
}
