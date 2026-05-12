"use client";

import { LayoutGrid, ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Typography } from "@/components/atoms/Typography";
import { StyledSidebar, StyledNavItem } from "./styles";

type SidebarProps = {
  isOpen: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  const navItems = [
    { label: "Painel CORBAN", href: "/painel", icon: LayoutGrid },
    { label: "Validação Operacional", href: "/validacao", icon: ShieldCheck },
  ];

  return (
    <StyledSidebar $isOpen={isOpen}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentPath === item.href || currentPath.startsWith(`${item.href}/`);

        return (
          <StyledNavItem
            key={item.href}
            $isActive={isActive}
            $isSidebarOpen={isOpen}
            onClick={() => {
              router.push(item.href);
              onNavigate?.();
            }}
            aria-label={item.label}
            title={!isOpen ? item.label : undefined}
          >
            <Icon size={16} aria-hidden="true" />
            {isOpen && <Typography variant="body">{item.label}</Typography>}
          </StyledNavItem>
        );
      })}
    </StyledSidebar>
  );
}
