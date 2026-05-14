export enum ProposalStatus {
  AGUARDANDO = "AGUARDANDO",
  AGUARDANDO_DOCUMENTOS = "AGUARDANDO DOCUMENTOS",
  AGUARDANDO_AUDITORIA = "AGUARDANDO AUDITORIA",
  ASSINADO = "ASSINADO",
  RECUSADO = "RECUSADO",
  EXPIRADO = "EXPIRADO",
}

export type RequestedDocumentType =
  | "RG_FRENTE_VERSO"
  | "CNH_ABERTA"
  | "COMPROVANTE_RESIDENCIA"
  | "SELFIE_COM_DOCUMENTO";

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

export interface DocumentRequest {
  id: string;
  documentType: RequestedDocumentType;
  documentLabel: string;
  instructions: string;
  requestedAt: string;
  requestedBy: "OPERACAO";
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
  documentRequests: DocumentRequest[];
  dossie: Dossie;
}

export interface ProposalsResponse {
  proposals: Proposal[];
}
