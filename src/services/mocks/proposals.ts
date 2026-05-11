import { ProposalStatus, type Proposal } from "@/types/Proposal";

export const proposalsMock: Proposal[] = [
  {
    id: "1",
    numeroProposta: "NC-2026-0001",
    nomeCliente: "Carlos Lima",
    status: ProposalStatus.AGUARDANDO,
    dataUltimoEvento: "2026-05-11T08:30:00.000Z",
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
    status: ProposalStatus.ASSINADO,
    dataUltimoEvento: "2026-05-10T19:15:00.000Z",
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
    status: ProposalStatus.RECUSADO,
    dataUltimoEvento: "2026-05-09T10:05:00.000Z",
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
    status: ProposalStatus.EXPIRADO,
    dataUltimoEvento: "2026-05-05T14:40:00.000Z",
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
