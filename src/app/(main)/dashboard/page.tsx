"use client";

import { Typography } from "@/components/atoms/Typography";
import { ProposalsTable } from "@/components/organisms/ProposalsTable";

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h1">Dashboard CORBAN</Typography>
      <Typography variant="body">
        Bem-vindo ao painel de controle de propostas.
      </Typography>
      <ProposalsTable />
    </div>
  );
}
