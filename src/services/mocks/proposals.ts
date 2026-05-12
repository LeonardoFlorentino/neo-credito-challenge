import { ProposalStatus, type Proposal } from "@/types/Proposal";

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isLikelyFemaleName(fullName: string) {
  const firstName = normalizeName(fullName).split(" ")[0] ?? "";

  const knownFemaleNames = new Set([
    "ana",
    "beatriz",
    "camila",
    "fernanda",
    "isabel",
    "isabela",
    "isabella",
    "mariana",
  ]);

  if (knownFemaleNames.has(firstName)) {
    return true;
  }

  return firstName.endsWith("a") && firstName !== "joao";
}

function seedToIndex(seed: string, max: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return (hash % max) + 1;
}

function getMockSelfieUrl(fullName: string, seed: string) {
  const gender = isLikelyFemaleName(fullName) ? "women" : "men";
  const index = seedToIndex(seed, 70);
  return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
}

function getMockDocumentUrl(fullName: string, seed: string) {
  const normalized = normalizeName(fullName);
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  const isFemale = isLikelyFemaleName(fullName);
  const accent = isFemale ? "#8f63d9" : "#2d7ccf";
  const accentSoft = isFemale ? "#ece2ff" : "#e2f0ff";
  const seedSuffix = normalized.slice(0, 6) || seed.slice(0, 6);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#eef3fb"/>
          <stop offset="100%" stop-color="#dde7f6"/>
        </linearGradient>
      </defs>
      <rect width="900" height="560" fill="url(#bg)"/>
      <rect x="40" y="40" width="820" height="480" rx="18" fill="#ffffff" stroke="#c7d4ea" stroke-width="3"/>
      <text x="78" y="110" fill="#2f446b" font-size="30" font-family="Arial, sans-serif" font-weight="700">Documento do Assinante</text>
      <rect x="78" y="140" width="300" height="300" rx="12" fill="#f8fbff" stroke="#d0dcee"/>
      <circle cx="228" cy="260" r="92" fill="${accentSoft}" stroke="${accent}" stroke-width="8"/>
      <text x="228" y="278" fill="${accent}" font-size="62" font-family="Arial, sans-serif" text-anchor="middle" font-weight="700">${initials}</text>
      <text x="420" y="200" fill="#334f77" font-size="22" font-family="Arial, sans-serif">Nome: ${fullName}</text>
      <text x="420" y="240" fill="#5f7394" font-size="19" font-family="Arial, sans-serif">Perfil inferido: ${isFemale ? "Feminino" : "Masculino"}</text>
      <text x="420" y="282" fill="#5f7394" font-size="19" font-family="Arial, sans-serif">Documento mockado para validação visual</text>
      <text x="420" y="324" fill="#5f7394" font-size="19" font-family="Arial, sans-serif">Fonte interna: proposalsMock</text>
      <text x="420" y="366" fill="#5f7394" font-size="19" font-family="Arial, sans-serif">Seed: ${seedSuffix}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

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
    nomeCliente: "João Pereira",
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
  {
    id: "5",
    numeroProposta: "NC-2026-0005",
    nomeCliente: "Rafael Mendonça",
    cpfCliente: "222.333.444-55",
    status: ProposalStatus.AGUARDANDO,
    dataUltimoEvento: "2026-05-11T09:00:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0005",
    dataEnvio: "2026-05-11T07:30:00.000Z",
    tentativasContato: [
      {
        id: "5-1",
        channel: "WHATSAPP",
        timestamp: "2026-05-11T07:35:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/5/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/5/documento.pdf",
      similaridade: 0.88,
      ipOrigem: "179.55.12.44",
      geolocalizacao: {
        lat: -3.71722,
        lng: -38.5434,
      },
    },
  },
  {
    id: "6",
    numeroProposta: "NC-2026-0006",
    nomeCliente: "Fernanda Rocha",
    cpfCliente: "333.444.555-66",
    status: ProposalStatus.ASSINADO,
    dataUltimoEvento: "2026-05-10T16:22:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0006",
    dataEnvio: "2026-05-10T10:00:00.000Z",
    tentativasContato: [
      {
        id: "6-1",
        channel: "EMAIL",
        timestamp: "2026-05-10T10:05:00.000Z",
        outcome: "SUCESSO",
      },
      {
        id: "6-2",
        channel: "LIGACAO",
        timestamp: "2026-05-10T14:30:00.000Z",
        outcome: "SUCESSO",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/6/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/6/documento.pdf",
      similaridade: 0.96,
      ipOrigem: "186.220.101.5",
      geolocalizacao: {
        lat: -12.971389,
        lng: -38.501389,
      },
    },
  },
  {
    id: "7",
    numeroProposta: "NC-2026-0007",
    nomeCliente: "Thiago Cavalcante",
    cpfCliente: "444.555.666-77",
    status: ProposalStatus.RECUSADO,
    dataUltimoEvento: "2026-05-08T11:10:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0007",
    dataEnvio: "2026-05-07T08:45:00.000Z",
    tentativasContato: [
      {
        id: "7-1",
        channel: "SMS",
        timestamp: "2026-05-07T09:00:00.000Z",
        outcome: "FALHA",
      },
      {
        id: "7-2",
        channel: "LIGACAO",
        timestamp: "2026-05-07T11:30:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
      {
        id: "7-3",
        channel: "WHATSAPP",
        timestamp: "2026-05-08T10:00:00.000Z",
        outcome: "FALHA",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/7/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/7/documento.pdf",
      similaridade: 0.35,
      ipOrigem: "200.200.200.1",
      geolocalizacao: {
        lat: -8.054277,
        lng: -34.881256,
      },
    },
  },
  {
    id: "8",
    numeroProposta: "NC-2026-0008",
    nomeCliente: "Isabela Nunes",
    cpfCliente: "666.777.888-99",
    status: ProposalStatus.AGUARDANDO,
    dataUltimoEvento: "2026-05-11T06:55:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0008",
    dataEnvio: "2026-05-10T22:00:00.000Z",
    tentativasContato: [
      {
        id: "8-1",
        channel: "EMAIL",
        timestamp: "2026-05-10T22:05:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/8/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/8/documento.pdf",
      similaridade: 0.91,
      ipOrigem: "189.77.43.200",
      geolocalizacao: {
        lat: -30.034647,
        lng: -51.217658,
      },
    },
  },
  {
    id: "9",
    numeroProposta: "NC-2026-0009",
    nomeCliente: "Bruno Figueiredo",
    cpfCliente: "777.888.999-00",
    status: ProposalStatus.EXPIRADO,
    dataUltimoEvento: "2026-05-02T09:30:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0009",
    dataEnvio: "2026-04-29T14:00:00.000Z",
    tentativasContato: [
      {
        id: "9-1",
        channel: "SMS",
        timestamp: "2026-04-29T14:10:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
      {
        id: "9-2",
        channel: "EMAIL",
        timestamp: "2026-04-30T09:00:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/9/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/9/documento.pdf",
      similaridade: 0.72,
      ipOrigem: "177.11.22.99",
      geolocalizacao: {
        lat: -25.428954,
        lng: -49.267137,
      },
    },
  },
  {
    id: "10",
    numeroProposta: "NC-2026-0010",
    nomeCliente: "Camila Sousa",
    cpfCliente: "101.202.303-44",
    status: ProposalStatus.ASSINADO,
    dataUltimoEvento: "2026-05-11T08:10:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0010",
    dataEnvio: "2026-05-11T06:00:00.000Z",
    tentativasContato: [
      {
        id: "10-1",
        channel: "WHATSAPP",
        timestamp: "2026-05-11T06:05:00.000Z",
        outcome: "SUCESSO",
      },
    ],
    dossie: {
      selfieUrl: "https://cdn.neo-credito.local/dossie/10/selfie.jpg",
      documentoUrl: "https://cdn.neo-credito.local/dossie/10/documento.pdf",
      similaridade: 0.99,
      ipOrigem: "191.55.77.130",
      geolocalizacao: {
        lat: -23.548943,
        lng: -46.638818,
      },
    },
  },
];

for (const proposal of proposalsMock) {
  const mediaSeed = `${proposal.id}-${proposal.nomeCliente}`;
  proposal.dossie.selfieUrl = getMockSelfieUrl(proposal.nomeCliente, mediaSeed);
  proposal.dossie.documentoUrl = getMockDocumentUrl(
    proposal.nomeCliente,
    mediaSeed,
  );
}

export async function fetchProposalsMock(delayMs = 700): Promise<Proposal[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

  return [...proposalsMock];
}

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
