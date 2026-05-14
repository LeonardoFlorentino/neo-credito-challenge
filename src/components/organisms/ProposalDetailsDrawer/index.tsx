"use client";

import { useEffect, useState } from "react";

import { Typography } from "@/components/atoms/Typography";
import type {
  ContactAttempt,
  DocumentRequest,
  Proposal,
} from "@/types/Proposal";
import { formatDateTime } from "@/utils/formatDate";

import {
  AttemptItem,
  AttemptNote,
  AttemptMeta,
  AttemptOutcome,
  AttemptsList,
  CertificateCard,
  CertificateContent,
  CertificateFooterNote,
  CertificateOverlay,
  CertificatePanel,
  CertificateRow,
  CloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerPanel,
  DrawerSubtitle,
  DrawerTitleGroup,
  FieldBlock,
  FieldLabel,
  FieldValue,
  SignatureActionButton,
  ValiditySeal,
} from "./styles";

type ProposalDetailsDrawerProps = {
  proposal: Proposal | null;
  isOpen: boolean;
  onClose: () => void;
};

function formatAttemptOutcome(outcome: ContactAttempt["outcome"]) {
  if (outcome === "SUCESSO") return "Sucesso";
  if (outcome === "SEM_RESPOSTA") return "Sem resposta";
  return "Falha";
}

function formatChannel(channel: ContactAttempt["channel"]) {
  if (channel === "LIGACAO") return "Ligação";
  return channel;
}

function formatRequestedBy(requestedBy: DocumentRequest["requestedBy"]) {
  if (requestedBy === "OPERACAO") return "Operação";
  return requestedBy;
}

export function ProposalDetailsDrawer({
  proposal,
  isOpen,
  onClose,
}: ProposalDetailsDrawerProps) {
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const handleCloseDrawer = () => {
    setIsCertificateOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isCertificateOpen) {
          setIsCertificateOpen(false);
          return;
        }

        setIsCertificateOpen(false);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isCertificateOpen, onClose]);

  return (
    <>
      <DrawerOverlay
        $open={isOpen}
        onClick={handleCloseDrawer}
        aria-hidden={!isOpen}
      />
      <DrawerPanel
        $open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes da proposta"
      >
        {proposal && (
          <>
            <DrawerHeader>
              <DrawerTitleGroup>
                <Typography variant="h2">{proposal.numeroProposta}</Typography>
                <DrawerSubtitle>{proposal.nomeCliente}</DrawerSubtitle>
              </DrawerTitleGroup>
              <CloseButton
                type="button"
                onClick={handleCloseDrawer}
                aria-label="Fechar painel"
              >
                x
              </CloseButton>
            </DrawerHeader>

            <DrawerContent>
              <FieldBlock>
                <FieldLabel>Link de assinatura</FieldLabel>
                <SignatureActionButton
                  type="button"
                  onClick={() => setIsCertificateOpen(true)}
                >
                  Abrir assinatura
                </SignatureActionButton>
              </FieldBlock>

              <FieldBlock>
                <FieldLabel>Data de envio</FieldLabel>
                <FieldValue>{formatDateTime(proposal.dataEnvio)}</FieldValue>
              </FieldBlock>

              <FieldBlock>
                <FieldLabel>Log de tentativas de contato</FieldLabel>
                <AttemptsList>
                  {proposal.tentativasContato.map((attempt) => (
                    <AttemptItem key={attempt.id}>
                      <AttemptMeta>
                        <span>{formatChannel(attempt.channel)}</span>
                        <span>{formatDateTime(attempt.timestamp)}</span>
                      </AttemptMeta>
                      <AttemptOutcome $success={attempt.outcome === "SUCESSO"}>
                        {formatAttemptOutcome(attempt.outcome)}
                      </AttemptOutcome>
                    </AttemptItem>
                  ))}
                </AttemptsList>
              </FieldBlock>

              {proposal.documentRequests.length > 0 && (
                <FieldBlock>
                  <FieldLabel>Solicitações de documento</FieldLabel>
                  <AttemptsList>
                    {proposal.documentRequests.map((request) => (
                      <AttemptItem key={request.id}>
                        <AttemptMeta>
                          <span>{request.documentLabel}</span>
                          <span>{formatDateTime(request.requestedAt)}</span>
                        </AttemptMeta>
                        <AttemptNote>{request.instructions}</AttemptNote>
                        <AttemptOutcome $success={false}>
                          Reenvio solicitado por{" "}
                          {formatRequestedBy(request.requestedBy)}
                        </AttemptOutcome>
                      </AttemptItem>
                    ))}
                  </AttemptsList>
                </FieldBlock>
              )}
            </DrawerContent>
          </>
        )}
      </DrawerPanel>

      {proposal && (
        <>
          <CertificateOverlay
            $open={isCertificateOpen}
            onClick={() => setIsCertificateOpen(false)}
            aria-hidden={!isCertificateOpen}
          />
          <CertificatePanel
            $open={isCertificateOpen}
            role="dialog"
            aria-modal="true"
            aria-label="Certificado mock de assinatura"
          >
            <DrawerHeader>
              <DrawerTitleGroup>
                <Typography variant="h2">Certificado de Assinatura</Typography>
                <DrawerSubtitle>Mock para validação do fluxo</DrawerSubtitle>
              </DrawerTitleGroup>
              <CloseButton
                type="button"
                onClick={() => setIsCertificateOpen(false)}
                aria-label="Fechar certificado mock"
              >
                x
              </CloseButton>
            </DrawerHeader>

            <CertificateContent>
              <CertificateCard>
                <CertificateRow>
                  <span>Proposta</span>
                  <span>{proposal.numeroProposta}</span>
                </CertificateRow>
                <CertificateRow>
                  <span>Cliente</span>
                  <span>{proposal.nomeCliente}</span>
                </CertificateRow>
                <CertificateRow>
                  <span>CPF</span>
                  <span>{proposal.cpfCliente}</span>
                </CertificateRow>
                <CertificateRow>
                  <span>Data de envio</span>
                  <span>{formatDateTime(proposal.dataEnvio)}</span>
                </CertificateRow>
                <CertificateRow>
                  <span>Origem mock</span>
                  <span>{proposal.assinaturaUrl}</span>
                </CertificateRow>
              </CertificateCard>

              <ValiditySeal>
                Válido
                <br />
                Neo Crédito
              </ValiditySeal>

              <CertificateFooterNote>
                Nota: o destino real da assinatura digital foi mockado para este
                teste. Este certificado é apenas ilustrativo para validação da
                experiência de navegação.
              </CertificateFooterNote>
            </CertificateContent>
          </CertificatePanel>
        </>
      )}
    </>
  );
}
