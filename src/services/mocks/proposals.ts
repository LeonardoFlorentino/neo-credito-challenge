import { ProposalStatus, type Proposal } from "@/types/Proposal";

export const proposalsMock: Proposal[] = [
  {
    id: "1",
    numeroProposta: "NC-2026-0001",
    nomeCliente: "Carlos Lima",
    cpfCliente: "123.456.789-10",
    status: ProposalStatus.AGUARDANDO,
    dataUltimoEvento: "2026-05-11T08:30:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0001",
    dataEnvio: "2026-05-10T13:20:00.000Z",
    tentativasContato: [
      {
        id: "1-1",
        channel: "WHATSAPP",
        timestamp: "2026-05-10T13:30:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
      {
        id: "1-2",
        channel: "LIGACAO",
        timestamp: "2026-05-10T17:05:00.000Z",
        outcome: "SUCESSO",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/1/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/1/documento.pdf",
      similaridade: 0.93,
      ipOrigem: "177.44.20.11",
      geolocalizacao: {
        lat: -23.55052,
        lng: -46.633308,
      },
    },
  },
  {
    id: "2",
    numeroProposta: "NC-2026-0002",
    nomeCliente: "Mariana Alves",
    cpfCliente: "987.654.321-00",
    status: ProposalStatus.ASSINADO,
    dataUltimoEvento: "2026-05-10T19:15:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0002",
    dataEnvio: "2026-05-09T11:40:00.000Z",
    tentativasContato: [
      {
        id: "2-1",
        channel: "EMAIL",
        timestamp: "2026-05-09T11:42:00.000Z",
        outcome: "SUCESSO",
      },
      {
        id: "2-2",
        channel: "SMS",
        timestamp: "2026-05-09T11:50:00.000Z",
        outcome: "SUCESSO",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/2/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/2/documento.pdf",
      similaridade: 0.98,
      ipOrigem: "189.102.55.90",
      geolocalizacao: {
        lat: -22.906847,
        lng: -43.172896,
      },
    },
  },
  {
    id: "3",
    numeroProposta: "NC-2026-0003",
    nomeCliente: "Joao Pereira",
    cpfCliente: "111.222.333-44",
    status: ProposalStatus.RECUSADO,
    dataUltimoEvento: "2026-05-09T10:05:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0003",
    dataEnvio: "2026-05-08T09:10:00.000Z",
    tentativasContato: [
      {
        id: "3-1",
        channel: "SMS",
        timestamp: "2026-05-08T09:20:00.000Z",
        outcome: "FALHA",
      },
      {
        id: "3-2",
        channel: "LIGACAO",
        timestamp: "2026-05-08T12:00:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/3/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/3/documento.pdf",
      similaridade: 0.41,
      ipOrigem: "200.167.44.201",
      geolocalizacao: {
        lat: -15.793889,
        lng: -47.882778,
      },
    },
  },
  {
    id: "4",
    numeroProposta: "NC-2026-0004",
    nomeCliente: "Ana Beatriz Costa",
    cpfCliente: "555.666.777-88",
    status: ProposalStatus.EXPIRADO,
    dataUltimoEvento: "2026-05-05T14:40:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0004",
    dataEnvio: "2026-05-03T08:00:00.000Z",
    tentativasContato: [
      {
        id: "4-1",
        channel: "EMAIL",
        timestamp: "2026-05-03T08:10:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
      {
        id: "4-2",
        channel: "WHATSAPP",
        timestamp: "2026-05-04T15:55:00.000Z",
        outcome: "FALHA",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/4/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/4/documento.pdf",
      similaridade: 0.77,
      ipOrigem: "201.10.88.33",
      geolocalizacao: {
        lat: -19.916681,
        lng: -43.934493,
      },
    },
  },
];

export function updateProposalStatusMock(id: string, status: ProposalStatus) {
  const targetIndex = proposalsMock.findIndex((proposal) => proposal.id === id);

  if (targetIndex < 0) {
    return null;
  }

  const updatedProposal: Proposal = {
    ...proposalsMock[targetIndex],
    status,
    dataUltimoEvento: new Date().toISOString(),
  };

  proposalsMock[targetIndex] = updatedProposal;

  return updatedProposal;
}
