export enum ProposalStatus {
  AGUARDANDO = "AGUARDANDO",
  ASSINADO = "ASSINADO",
  RECUSADO = "RECUSADO",
  EXPIRADO = "EXPIRADO",
}

export interface ContactAttempt {
  id: string;
  channel: "WHATSAPP" | "SMS" | "EMAIL" | "LIGACAO";
  timestamp: string;
  outcome: "SUCESSO" | "SEM_RESPOSTA" | "FALHA";
}

export interface Dossie {
  selfieUrl: string;
  documentoUrl: string;
  similaridade: number;
  ipOrigem: string;
  geolocalizacao: {
    lat: number;
    lng: number;
  };
}

export interface Proposal {
  id: string;
  numeroProposta: string;
  nomeCliente: string;
  cpfCliente: string;
  status: ProposalStatus;
  dataUltimoEvento: string;
  assinaturaUrl: string;
  dataEnvio: string;
  tentativasContato: ContactAttempt[];
  dossie: Dossie;
}

export interface ProposalsResponse {
  proposals: Proposal[];
}
