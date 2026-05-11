"use client";

import { useEffect } from "react";

import { Typography } from "@/components/atoms/Typography";
import type { ContactAttempt, Proposal } from "@/types/Proposal";

import {
  AttemptItem,
  AttemptMeta,
  AttemptOutcome,
  AttemptsList,
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
  SignatureLink,
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

export function ProposalDetailsDrawer({
  proposal,
  isOpen,
  onClose,
}: ProposalDetailsDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <DrawerOverlay $open={isOpen} onClick={onClose} aria-hidden={!isOpen} />
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
              <CloseButton type="button" onClick={onClose} aria-label="Fechar painel">
                x
              </CloseButton>
            </DrawerHeader>

            <DrawerContent>
              <FieldBlock>
                <FieldLabel>Link de assinatura</FieldLabel>
                <SignatureLink
                  href={proposal.assinaturaUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Abrir assinatura
                </SignatureLink>
              </FieldBlock>

              <FieldBlock>
                <FieldLabel>Data de envio</FieldLabel>
                <FieldValue>
                  {new Date(proposal.dataEnvio).toLocaleString("pt-BR")}
                </FieldValue>
              </FieldBlock>

              <FieldBlock>
                <FieldLabel>Log de tentativas de contato</FieldLabel>
                <AttemptsList>
                  {proposal.tentativasContato.map((attempt) => (
                    <AttemptItem key={attempt.id}>
                      <AttemptMeta>
                        <span>{formatChannel(attempt.channel)}</span>
                        <span>{new Date(attempt.timestamp).toLocaleString("pt-BR")}</span>
                      </AttemptMeta>
                      <AttemptOutcome $success={attempt.outcome === "SUCESSO"}>
                        {formatAttemptOutcome(attempt.outcome)}
                      </AttemptOutcome>
                    </AttemptItem>
                  ))}
                </AttemptsList>
              </FieldBlock>
            </DrawerContent>
          </>
        )}
      </DrawerPanel>
    </>
  );
}
