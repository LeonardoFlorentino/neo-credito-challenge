import type { Proposal } from "@/types/Proposal";

import { Card, Meta, Title } from "./styles";

type DossierCardProps = {
  proposal: Proposal;
};

export function DossierCard({ proposal }: DossierCardProps) {
  return (
    <Card>
      <Title>Dossier #{proposal.id}</Title>
      <Meta>Customer: {proposal.customerName}</Meta>
      <Meta>Status: {proposal.status}</Meta>
      <Meta>Amount: {proposal.amount}</Meta>
    </Card>
  );
}
