import type { Proposal } from "@/types/Proposal";

import { Card, Meta, Title } from "./styles";

type DossierCardProps = {
  proposal: Proposal;
};

export function DossierCard({ proposal }: DossierCardProps) {
  return (
    <Card>
      <Title>Dossie {proposal.numeroProposta}</Title>
      <Meta>Cliente: {proposal.nomeCliente}</Meta>
      <Meta>Status: {proposal.status}</Meta>
      <Meta>Selfie: {proposal.dossie.selfieUrl}</Meta>
      <Meta>Documento: {proposal.dossie.documentoUrl}</Meta>
      <Meta>Similaridade: {proposal.dossie.similaridade}</Meta>
      <Meta>IP de Origem: {proposal.dossie.ipOrigem}</Meta>
      <Meta>
        Geolocalizacao: {proposal.dossie.geolocalizacao.lat}, {proposal.dossie.geolocalizacao.lng}
      </Meta>
    </Card>
  );
}
