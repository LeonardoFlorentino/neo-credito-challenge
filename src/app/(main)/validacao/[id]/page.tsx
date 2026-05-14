"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileWarning,
  RotateCcw,
  ShieldAlert,
  XCircle,
  ZoomIn,
} from "lucide-react";

import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { MiniMap } from "@/components/molecules/MiniMap";
import { SimilarityScore } from "@/components/molecules/SimilarityScore";
import { useProposals } from "@/hooks/useProposals";
import { ProposalStatus, type RequestedDocumentType } from "@/types/Proposal";
import { formatDateTime } from "@/utils/formatDate";

import styles from "./page.module.css";

function formatCanal(canal: "WHATSAPP" | "SMS" | "EMAIL" | "LIGACAO") {
  if (canal === "LIGACAO") return "Ligação";
  return canal;
}

function formatResultado(resultado: "SUCESSO" | "SEM_RESPOSTA" | "FALHA") {
  if (resultado === "SUCESSO") return "Sucesso";
  if (resultado === "SEM_RESPOSTA") return "Sem resposta";
  return "Falha";
}

type CityReference = {
  name: string;
  lat: number;
  lng: number;
};

const CITY_REFERENCES: CityReference[] = [
  { name: "São Paulo - SP", lat: -23.55052, lng: -46.633308 },
  { name: "Rio de Janeiro - RJ", lat: -22.906847, lng: -43.172896 },
  { name: "Brasília - DF", lat: -15.793889, lng: -47.882778 },
  { name: "Belo Horizonte - MG", lat: -19.916681, lng: -43.934493 },
  { name: "Fortaleza - CE", lat: -3.71722, lng: -38.5434 },
  { name: "Salvador - BA", lat: -12.971389, lng: -38.501389 },
  { name: "Recife - PE", lat: -8.054277, lng: -34.881256 },
  { name: "Porto Alegre - RS", lat: -30.034647, lng: -51.217658 },
  { name: "Curitiba - PR", lat: -25.428954, lng: -49.267137 },
];

function getApproximateAddress(lat: number, lng: number) {
  const nearestCity = CITY_REFERENCES.reduce((closest, candidate) => {
    const closestDistance = Math.hypot(closest.lat - lat, closest.lng - lng);
    const candidateDistance = Math.hypot(
      candidate.lat - lat,
      candidate.lng - lng,
    );

    return candidateDistance < closestDistance ? candidate : closest;
  }, CITY_REFERENCES[0]);

  return `Região aproximada de ${nearestCity.name}`;
}

export default function ValidacaoPorIdPage() {
  const params = useParams<{ id: string }>();
  const {
    proposals,
    isLoading,
    error,
    retry,
    updateProposalStatus,
    requestNewDocument,
  } = useProposals();
  const id = typeof params?.id === "string" ? params.id : "";
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestDocumentModal, setShowRequestDocumentModal] =
    useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "Proposta atualizada para AGUARDANDO AUDITORIA.",
  );
  const [pendingReason, setPendingReason] = useState("");
  const [pendingDetail, setPendingDetail] = useState("");
  const [requestedDocumentType, setRequestedDocumentType] = useState<
    RequestedDocumentType | ""
  >("");
  const [requestDocumentReason, setRequestDocumentReason] = useState("");
  const [zoomImage, setZoomImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [showSignatureMock, setShowSignatureMock] = useState(false);
  const approveCancelButtonRef = useRef<HTMLButtonElement>(null);
  const rejectReasonRef = useRef<HTMLSelectElement>(null);
  const requestDocumentTypeRef = useRef<HTMLSelectElement>(null);
  const zoomCloseButtonRef = useRef<HTMLButtonElement>(null);
  const signatureCloseButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const proposta = proposals.find((item) => item.id === id);

  useEffect(() => {
    if (!showSuccessToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showSuccessToast]);

  useEffect(() => {
    const isAnyModalOpen =
      showApproveModal ||
      showRejectModal ||
      showRequestDocumentModal ||
      zoomImage !== null ||
      showSignatureMock;

    if (!isAnyModalOpen) {
      return;
    }

    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const focusTimeoutId = window.setTimeout(() => {
      if (showApproveModal) {
        approveCancelButtonRef.current?.focus();
        return;
      }

      if (showRejectModal) {
        rejectReasonRef.current?.focus();
        return;
      }

      if (showRequestDocumentModal) {
        requestDocumentTypeRef.current?.focus();
        return;
      }

      if (zoomImage) {
        zoomCloseButtonRef.current?.focus();
        return;
      }

      if (showSignatureMock) {
        signatureCloseButtonRef.current?.focus();
      }
    }, 0);

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (showSignatureMock) {
        setShowSignatureMock(false);
        return;
      }

      if (showRequestDocumentModal) {
        setShowRequestDocumentModal(false);
        return;
      }

      if (zoomImage) {
        setZoomImage(null);
        return;
      }

      if (showRejectModal) {
        setShowRejectModal(false);
        return;
      }

      if (showApproveModal) {
        setShowApproveModal(false);
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.clearTimeout(focusTimeoutId);
      window.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
      lastFocusedElementRef.current?.focus();
    };
  }, [
    showApproveModal,
    showRejectModal,
    showRequestDocumentModal,
    showSignatureMock,
    zoomImage,
  ]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton width="280px" height="34px" />
        <Skeleton width="180px" height="20px" />
        <Skeleton height="220px" radius="12px" />
        <Skeleton height="280px" radius="12px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Typography variant="h1">Validação da Proposta</Typography>
        <Typography variant="body">{error}</Typography>
        <Button onClick={() => void retry()}>
          <RotateCcw size={16} aria-hidden="true" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!proposta) {
    notFound();
  }

  const handleConfirmApprove = () => {
    const hasUpdated = updateProposalStatus(
      proposta.id,
      ProposalStatus.AGUARDANDO_AUDITORIA,
    );

    setShowApproveModal(false);

    if (hasUpdated) {
      setToastMessage("Proposta atualizada para AGUARDANDO AUDITORIA.");
      setShowSuccessToast(true);
    }
  };

  const handleConfirmReject = () => {
    const hasUpdated = updateProposalStatus(
      proposta.id,
      ProposalStatus.RECUSADO,
    );

    if (!hasUpdated) {
      return;
    }

    setShowRejectModal(false);
    setPendingReason("");
    setPendingDetail("");
    setToastMessage("Proposta atualizada para RECUSADO.");
    setShowSuccessToast(true);
  };

  const handleConfirmRequestDocument = () => {
    if (!requestedDocumentType) {
      return;
    }

    const hasUpdated = requestNewDocument(proposta.id, {
      documentType: requestedDocumentType,
      instructions: requestDocumentReason.trim(),
    });

    if (!hasUpdated) {
      return;
    }

    setShowRequestDocumentModal(false);
    setRequestedDocumentType("");
    setRequestDocumentReason("");
    setToastMessage("Proposta atualizada para AGUARDANDO DOCUMENTOS.");
    setShowSuccessToast(true);
  };

  const isRejectFormValid =
    pendingReason.trim().length > 0 && pendingDetail.trim().length > 0;
  const isRequestDocumentFormValid =
    requestedDocumentType.trim().length > 0 &&
    requestDocumentReason.trim().length > 0;
  const assinaturaConcluida = proposta.status === ProposalStatus.ASSINADO;
  const dataAssinatura = assinaturaConcluida
    ? formatDateTime(proposta.dataUltimoEvento)
    : "Assinatura ainda não concluída";
  const approximateAddress = getApproximateAddress(
    proposta.dossie.geolocalizacao.lat,
    proposta.dossie.geolocalizacao.lng,
  );
  const selfiePreview = proposta.dossie.selfieUrl;
  const documentPreview = proposta.dossie.documentoUrl;
  const isDataImage = (src: string) => src.startsWith("data:");
  const canReviewProposal = proposta.status === ProposalStatus.ASSINADO;

  return (
    <div className={styles.container}>
      <Link href="/validacao" className={styles.backLink}>
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar para validação operacional
      </Link>

      <header className={styles.header}>
        <Typography variant="h1" className={styles.titleWithIcon}>
          <ClipboardCheck
            size={26}
            className={styles.titleIcon}
            aria-hidden="true"
          />
          Validação da Proposta
        </Typography>
        <div className={styles.statusRow}>
          <Typography variant="body">{proposta.numeroProposta}</Typography>
          <Badge variant={proposta.status}>{proposta.status}</Badge>
        </div>
      </header>

      <section className={styles.grid}>
        {/* Coluna 1 — Selfie */}
        <article
          className={`${styles.card} ${styles.cardThird} ${styles.cardSelfie}`}
        >
          <button
            type="button"
            className={styles.selfieButton}
            onClick={() =>
              setZoomImage({ src: selfiePreview, alt: "Selfie do assinante" })
            }
          >
            <div className={styles.selfieImageWrap}>
              <Image
                className={styles.selfieImage}
                src={selfiePreview}
                alt="Selfie do assinante"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                unoptimized={isDataImage(selfiePreview)}
              />
            </div>
            <span className={styles.selfieCaption}>
              <ZoomIn size={14} aria-hidden="true" />
              Ampliar selfie
            </span>
          </button>
        </article>

        {/* Coluna 2 — Dados do Assinante + Documento */}
        <article className={`${styles.card} ${styles.cardThird}`}>
          <Typography variant="h2">Dados do Assinante</Typography>

          <div className={styles.subscriberGrid}>
            <div className={styles.field}>
              <span className={styles.label}>Nome</span>
              <span className={styles.value}>{proposta.nomeCliente}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>CPF</span>
              <span className={styles.value}>{proposta.cpfCliente}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>IP</span>
              <span className={styles.value}>{proposta.dossie.ipOrigem}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.label}>Data da assinatura</span>
              <span className={styles.value}>{dataAssinatura}</span>
            </div>

            <div className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.label}>Endereço aproximado</span>
              <span className={styles.value}>{approximateAddress}</span>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.mediaCard} ${styles.mediaCardGrow}`}
            onClick={() =>
              setZoomImage({
                src: documentPreview,
                alt: "Documento do assinante",
              })
            }
          >
            <div className={styles.mediaImageWrap}>
              <Image
                className={styles.mediaImage}
                src={documentPreview}
                alt="Documento do assinante"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                unoptimized={isDataImage(documentPreview)}
              />
            </div>
            <span className={styles.mediaCaption}>
              <ZoomIn size={14} aria-hidden="true" />
              Ampliar documento
            </span>
          </button>
        </article>

        <article className={`${styles.card} ${styles.cardThird}`}>
          <Typography variant="h2">Análise de Identidade</Typography>

          <SimilarityScore value={proposta.dossie.similaridade} />

          <div className={styles.field}>
            <span className={styles.label}>Geolocalização</span>
            <span className={styles.value}>
              {proposta.dossie.geolocalizacao.lat},{" "}
              {proposta.dossie.geolocalizacao.lng}
            </span>
          </div>

          <div className={styles.mapGrow}>
            <MiniMap
              lat={proposta.dossie.geolocalizacao.lat}
              lng={proposta.dossie.geolocalizacao.lng}
            />
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardFull}`}>
          <Typography variant="h2">Ações</Typography>

          <div className={styles.actions}>
            <Button
              variant="success"
              onClick={() => setShowApproveModal(true)}
              disabled={
                !canReviewProposal ||
                proposta.status === ProposalStatus.AGUARDANDO_AUDITORIA ||
                proposta.status === ProposalStatus.RECUSADO
              }
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              Aprovar validação
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowRejectModal(true)}
              disabled={
                !canReviewProposal ||
                proposta.status === ProposalStatus.RECUSADO
              }
            >
              <ShieldAlert size={16} aria-hidden="true" />
              Reprovar proposta
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowRequestDocumentModal(true)}
              disabled={!canReviewProposal}
            >
              <FileWarning size={16} aria-hidden="true" />
              Solicitar novo documento
            </Button>
            <button
              type="button"
              className={styles.actionLinkButton}
              onClick={() => setShowSignatureMock(true)}
            >
              <ExternalLink size={16} aria-hidden="true" />
              Abrir assinatura digital
            </button>
          </div>

          {!canReviewProposal && (
            <Typography variant="caption" className={styles.reviewHint}>
              A validação do dossiê fica habilitada apenas quando a proposta
              estiver com status ASSINADO.
            </Typography>
          )}

          <Typography variant="body">Log de tentativas de contato</Typography>

          <ul className={styles.list}>
            {proposta.tentativasContato.map((tentativa) => (
              <li key={tentativa.id} className={styles.listItem}>
                <span className={styles.value}>
                  {formatCanal(tentativa.channel)} em{" "}
                  {formatDateTime(tentativa.timestamp)}
                </span>
                <span
                  className={
                    tentativa.outcome === "SUCESSO"
                      ? styles.outcomeOk
                      : styles.outcomeWarn
                  }
                >
                  {formatResultado(tentativa.outcome)}
                </span>
              </li>
            ))}
          </ul>

          {proposta.documentRequests.length > 0 && (
            <>
              <Typography variant="body">Solicitações de documento</Typography>

              <ul className={styles.list}>
                {proposta.documentRequests.map((request) => (
                  <li key={request.id} className={styles.listItem}>
                    <div className={styles.logContent}>
                      <span className={styles.value}>
                        {request.documentLabel}
                      </span>
                      <span className={styles.logDescription}>
                        {request.instructions}
                      </span>
                      <span className={styles.logMeta}>
                        Operação em {formatDateTime(request.requestedAt)}
                      </span>
                    </div>
                    <span className={styles.requestBadge}>
                      Reenvio solicitado
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      </section>

      {showApproveModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowApproveModal(false)}
          role="presentation"
        >
          <div
            className={styles.modalCard}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="approve-dialog-title"
          >
            <Typography variant="h2" id="approve-dialog-title">
              Confirmar aprovação
            </Typography>
            <Typography variant="body">
              Deseja enviar esta proposta para auditoria?
            </Typography>
            <div className={styles.modalActions}>
              <Button
                variant="ghost"
                ref={approveCancelButtonRef}
                onClick={() => setShowApproveModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleConfirmApprove}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowRejectModal(false)}
          role="presentation"
        >
          <div
            className={styles.modalCard}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-dialog-title"
          >
            <Typography variant="h2" id="reject-dialog-title">
              Informar Pendência
            </Typography>
            <Typography variant="body">
              Selecione o motivo e descreva a pendência para reprovar a
              proposta.
            </Typography>

            <label className={styles.modalField}>
              <span className={styles.label}>Motivo</span>
              <select
                ref={rejectReasonRef}
                className={styles.modalInput}
                value={pendingReason}
                onChange={(event) => setPendingReason(event.target.value)}
              >
                <option value="">Selecione um motivo</option>
                <option value="DOCUMENTO_ILEGIVEL">Documento ilegível</option>
                <option value="DIVERGENCIA_BIOMETRICA">
                  Divergência biométrica
                </option>
                <option value="DADOS_INCONSISTENTES">
                  Dados inconsistentes
                </option>
                <option value="SUSPEITA_FRAUDE">Suspeita de fraude</option>
              </select>
            </label>

            <label className={styles.modalField}>
              <span className={styles.label}>Descrição da pendência</span>
              <textarea
                className={styles.modalTextarea}
                value={pendingDetail}
                onChange={(event) => setPendingDetail(event.target.value)}
                rows={4}
                placeholder="Descreva a pendência encontrada"
              />
            </label>

            <div className={styles.modalActions}>
              <Button variant="ghost" onClick={() => setShowRejectModal(false)}>
                Cancelar
              </Button>
              <Button
                variant="secondary"
                onClick={handleConfirmReject}
                disabled={!isRejectFormValid}
              >
                <XCircle size={16} aria-hidden="true" />
                Confirmar reprovação
              </Button>
            </div>
          </div>
        </div>
      )}

      {showRequestDocumentModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowRequestDocumentModal(false)}
          role="presentation"
        >
          <div
            className={styles.modalCard}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-document-dialog-title"
          >
            <Typography variant="h2" id="request-document-dialog-title">
              Solicitar novo documento
            </Typography>
            <Typography variant="body">
              Informe qual documento deve ser reenviado e descreva a orientação
              para o CORBAN ou cliente.
            </Typography>

            <label className={styles.modalField}>
              <span className={styles.label}>Documento solicitado</span>
              <select
                ref={requestDocumentTypeRef}
                className={styles.modalInput}
                value={requestedDocumentType}
                onChange={(event) =>
                  setRequestedDocumentType(
                    event.target.value as RequestedDocumentType | "",
                  )
                }
              >
                <option value="">Selecione um documento</option>
                <option value="RG_FRENTE_VERSO">RG frente e verso</option>
                <option value="CNH_ABERTA">CNH aberta</option>
                <option value="COMPROVANTE_RESIDENCIA">
                  Comprovante de residência
                </option>
                <option value="SELFIE_COM_DOCUMENTO">
                  Selfie com documento
                </option>
              </select>
            </label>

            <label className={styles.modalField}>
              <span className={styles.label}>Orientação</span>
              <textarea
                className={styles.modalTextarea}
                value={requestDocumentReason}
                onChange={(event) =>
                  setRequestDocumentReason(event.target.value)
                }
                rows={4}
                placeholder="Explique o ajuste necessário para o reenvio"
              />
            </label>

            <div className={styles.modalActions}>
              <Button
                variant="ghost"
                onClick={() => setShowRequestDocumentModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmRequestDocument}
                disabled={!isRequestDocumentFormValid}
              >
                Confirmar solicitação
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      {showSignatureMock && (
        <div
          className={styles.signatureOverlay}
          onClick={() => setShowSignatureMock(false)}
          role="presentation"
        >
          <aside
            className={styles.signaturePanel}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Certificado mock de assinatura"
          >
            <header className={styles.signatureHeader}>
              <div className={styles.signatureTitleWrap}>
                <Typography variant="h2">Certificado de Assinatura</Typography>
                <Typography variant="caption">
                  Mock para validação do fluxo
                </Typography>
              </div>
              <Button
                variant="ghost"
                ref={signatureCloseButtonRef}
                onClick={() => setShowSignatureMock(false)}
              >
                Fechar
              </Button>
            </header>

            <div className={styles.signatureContent}>
              <section className={styles.signatureCard}>
                <div className={styles.signatureRow}>
                  <span>Proposta</span>
                  <span>{proposta.numeroProposta}</span>
                </div>
                <div className={styles.signatureRow}>
                  <span>Cliente</span>
                  <span>{proposta.nomeCliente}</span>
                </div>
                <div className={styles.signatureRow}>
                  <span>CPF</span>
                  <span>{proposta.cpfCliente}</span>
                </div>
                <div className={styles.signatureRow}>
                  <span>Data de envio</span>
                  <span>{formatDateTime(proposta.dataEnvio)}</span>
                </div>
                <div className={styles.signatureRow}>
                  <span>Origem mock</span>
                  <span>{proposta.assinaturaUrl}</span>
                </div>
              </section>

              <div className={styles.signatureSeal}>
                Válido
                <br />
                Neo Crédito
              </div>

              <Typography variant="caption" className={styles.signatureNote}>
                Nota: o destino real da assinatura digital foi mockado para este
                teste. Este certificado é apenas ilustrativo para validação da
                experiência de navegação.
              </Typography>
            </div>
          </aside>
        </div>
      )}

      {zoomImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setZoomImage(null)}
          role="presentation"
        >
          <div
            className={`${styles.modalCard} ${styles.zoomModal}`}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={zoomImage.alt}
          >
            <Image
              className={styles.zoomImage}
              src={zoomImage.src}
              alt={zoomImage.alt}
              width={1400}
              height={900}
              unoptimized={isDataImage(zoomImage.src)}
            />
            <div className={styles.modalActions}>
              <Button
                variant="ghost"
                ref={zoomCloseButtonRef}
                onClick={() => setZoomImage(null)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
