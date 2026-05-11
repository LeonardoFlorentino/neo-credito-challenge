export enum ProposalStatus {
  AGUARDANDO = "AGUARDANDO",
  ASSINADO = "ASSINADO",
  RECUSADO = "RECUSADO",
  EXPIRADO = "EXPIRADO",
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
  status: ProposalStatus;
  dataUltimoEvento: string;
  dossie: Dossie;
}

export interface ProposalsResponse {
  proposals: Proposal[];
}
