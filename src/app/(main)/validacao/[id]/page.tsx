"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { MiniMap } from "@/components/molecules/MiniMap";
import { SimilarityScore } from "@/components/molecules/SimilarityScore";
import { useProposals } from "@/hooks/useProposals";
import { ProposalStatus } from "@/types/Proposal";

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

export default function ValidacaoPorIdPage() {
  const params = useParams<{ id: string }>();
  const { proposals, isLoading, error, retry, updateProposalStatus } = useProposals();
  const id = typeof params?.id === "string" ? params.id : "";
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "Proposta atualizada para AGUARDANDO AUDITORIA.",
  );
  const [pendingReason, setPendingReason] = useState("");
  const [pendingDetail, setPendingDetail] = useState("");
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
        <Button onClick={() => void retry()}>Tentar novamente</Button>
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
    const hasUpdated = updateProposalStatus(proposta.id, ProposalStatus.RECUSADO);

    if (!hasUpdated) {
      return;
    }

    setShowRejectModal(false);
    setPendingReason("");
    setPendingDetail("");
    setToastMessage("Proposta atualizada para RECUSADO.");
    setShowSuccessToast(true);
  };

  const isRejectFormValid =
    pendingReason.trim().length > 0 && pendingDetail.trim().length > 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Typography variant="h1">Validação da Proposta</Typography>
        <div className={styles.statusRow}>
          <Typography variant="body">{proposta.numeroProposta}</Typography>
          <Badge variant={proposta.status}>{proposta.status}</Badge>
        </div>
      </header>

      <section className={styles.grid}>
        <article className={`${styles.card} ${styles.cardWide}`}>
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
              <span className={styles.label}>Data</span>
              <span className={styles.value}>
                {new Date(proposta.dataEnvio).toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardMedium}`}>
          <Typography variant="h2">Análise de Identidade</Typography>

          <SimilarityScore value={proposta.dossie.similaridade} />

          <div className={styles.field}>
            <span className={styles.label}>Geolocalização</span>
            <span className={styles.value}>
              {proposta.dossie.geolocalizacao.lat}, {proposta.dossie.geolocalizacao.lng}
            </span>
          </div>

          <MiniMap
            lat={proposta.dossie.geolocalizacao.lat}
            lng={proposta.dossie.geolocalizacao.lng}
          />
        </article>

        <article className={`${styles.card} ${styles.cardFull}`}>
          <Typography variant="h2">Ações</Typography>

          <div className={styles.actions}>
            <Button
              variant="primary"
              onClick={() => setShowApproveModal(true)}
              disabled={
                proposta.status === ProposalStatus.AGUARDANDO_AUDITORIA ||
                proposta.status === ProposalStatus.RECUSADO
              }
            >
              Aprovar validação
            </Button>
            <Button variant="ghost">Solicitar novo documento</Button>
            <Button
              variant="secondary"
              onClick={() => setShowRejectModal(true)}
              disabled={proposta.status === ProposalStatus.RECUSADO}
            >
              Reprovar proposta
            </Button>
            <Link
              className={styles.actionLinkButton}
              href={proposta.assinaturaUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Abrir assinatura digital
            </Link>
          </div>

          <Typography variant="body">Log de tentativas de contato</Typography>

          <ul className={styles.list}>
            {proposta.tentativasContato.map((tentativa) => (
              <li key={tentativa.id} className={styles.listItem}>
                <span className={styles.value}>
                  {formatCanal(tentativa.channel)} em{" "}
                  {new Date(tentativa.timestamp).toLocaleString("pt-BR")}
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
              <Button variant="ghost" onClick={() => setShowApproveModal(false)}>
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
              Selecione o motivo e descreva a pendência para reprovar a proposta.
            </Typography>

            <label className={styles.modalField}>
              <span className={styles.label}>Motivo</span>
              <select
                className={styles.modalInput}
                value={pendingReason}
                onChange={(event) => setPendingReason(event.target.value)}
              >
                <option value="">Selecione um motivo</option>
                <option value="DOCUMENTO_ILEGIVEL">Documento ilegível</option>
                <option value="DIVERGENCIA_BIOMETRICA">Divergência biométrica</option>
                <option value="DADOS_INCONSISTENTES">Dados inconsistentes</option>
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
                Confirmar reprovação
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
    </div>
  );
}
