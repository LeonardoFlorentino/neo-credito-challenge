"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
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
  const { proposals, updateProposalStatus } = useProposals();
  const id = typeof params?.id === "string" ? params.id : "";
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const proposta = proposals.find((item) => item.id === id);

  if (!proposta) {
    notFound();
  }

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

  const handleConfirmApprove = () => {
    const hasUpdated = updateProposalStatus(
      proposta.id,
      ProposalStatus.AGUARDANDO_AUDITORIA,
    );

    setShowApproveModal(false);

    if (hasUpdated) {
      setShowSuccessToast(true);
    }
  };

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
              disabled={proposta.status === ProposalStatus.AGUARDANDO_AUDITORIA}
            >
              Aprovar validação
            </Button>
            <Button variant="ghost">Solicitar novo documento</Button>
            <Button variant="secondary">Rejeitar proposta</Button>
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

      {showSuccessToast && (
        <div className={styles.toast} role="status" aria-live="polite">
          Proposta atualizada para AGUARDANDO AUDITORIA.
        </div>
      )}
    </div>
  );
}
