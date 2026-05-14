"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";

import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { useProposals } from "@/hooks/useProposals";
import { formatDateTime } from "@/utils/formatDate";
import { ProposalStatus } from "@/types/Proposal";

import styles from "./page.module.css";

function getStatusLabel(status: ProposalStatus) {
  if (status === ProposalStatus.AGUARDANDO_DOCUMENTOS) {
    return "Aguardando Documentos";
  }

  if (status === ProposalStatus.AGUARDANDO_AUDITORIA) {
    return "Aguardando Auditoria";
  }

  if (status === ProposalStatus.AGUARDANDO) {
    return "Aguardando";
  }

  if (status === ProposalStatus.ASSINADO) {
    return "Assinado";
  }

  if (status === ProposalStatus.RECUSADO) {
    return "Recusado";
  }

  return "Expirado";
}

export default function ValidacaoPage() {
  const { proposals, isLoading, error, retry } = useProposals();

  if (isLoading) {
    return (
      <section className={styles.container}>
        <Skeleton width="280px" height="34px" />
        <Skeleton width="360px" height="18px" />
        <div className={styles.summaryGrid}>
          <Skeleton height="88px" radius="10px" />
          <Skeleton height="88px" radius="10px" />
          <Skeleton height="88px" radius="10px" />
        </div>
        <Skeleton height="126px" radius="12px" />
        <Skeleton height="126px" radius="12px" />
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.container}>
        <Typography variant="h1">Validação Operacional</Typography>
        <Typography variant="body">{error}</Typography>
        <Button onClick={() => void retry()}>
          <RotateCcw size={16} aria-hidden="true" />
          Tentar novamente
        </Button>
      </section>
    );
  }

  const waitingCount = proposals.filter(
    (proposal) =>
      proposal.status === ProposalStatus.AGUARDANDO ||
      proposal.status === ProposalStatus.AGUARDANDO_DOCUMENTOS,
  ).length;
  const auditCount = proposals.filter(
    (proposal) => proposal.status === ProposalStatus.AGUARDANDO_AUDITORIA,
  ).length;
  const rejectedCount = proposals.filter(
    (proposal) => proposal.status === ProposalStatus.RECUSADO,
  ).length;

  return (
    <section className={styles.container}>
      <Typography variant="h1">Validação Operacional</Typography>

      <Typography variant="body" className={styles.subtitle}>
        Selecione uma proposta para abrir a validação detalhada.
      </Typography>

      <div className={styles.summaryGrid}>
        <article className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Pendentes</span>
          <strong className={styles.summaryValue}>{waitingCount}</strong>
        </article>
        <article className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Em auditoria</span>
          <strong className={styles.summaryValue}>{auditCount}</strong>
        </article>
        <article className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Recusadas</span>
          <strong className={styles.summaryValue}>{rejectedCount}</strong>
        </article>
      </div>

      <ul className={styles.list}>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            <Link
              className={styles.cardLink}
              href={`/validacao/${proposal.id}`}
            >
              <article className={styles.card}>
                <header className={styles.cardHeader}>
                  <div className={styles.cardTitleBlock}>
                    <h2 className={styles.cardTitle}>
                      {proposal.numeroProposta}
                    </h2>
                    <p className={styles.cardSubtitle}>
                      {proposal.nomeCliente}
                    </p>
                  </div>
                  <Badge variant={proposal.status}>
                    {getStatusLabel(proposal.status)}
                  </Badge>
                </header>

                <dl className={styles.metaGrid}>
                  <div>
                    <dt className={styles.metaLabel}>Data de envio</dt>
                    <dd className={styles.metaValue}>
                      {formatDateTime(proposal.dataEnvio)}
                    </dd>
                  </div>
                  <div>
                    <dt className={styles.metaLabel}>CPF</dt>
                    <dd className={styles.metaValue}>{proposal.cpfCliente}</dd>
                  </div>
                </dl>

                <span className={styles.openHint}>
                  <ArrowUpRight size={14} aria-hidden="true" /> Abrir validação
                </span>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
