"use client";

import type { ReactNode } from "react";
import { MainLayout } from "@/components/organisms/MainLayout";

export default function MainLayoutWrapper({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
