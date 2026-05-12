"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { FilterBar } from "@/components/molecules/FilterBar";
import { ProposalDetailsDrawer } from "@/components/organisms/ProposalDetailsDrawer";
import { ProposalsTable } from "@/components/organisms/ProposalsTable";
import { useProposals } from "@/hooks/useProposals";
import { Proposal, ProposalStatus } from "@/types/Proposal";

export default function PainelPage() {
  const { proposals, isLoading, error, retry } = useProposals();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<ProposalStatus | "ALL">("ALL");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const filteredProposals = useMemo(
    () =>
      proposals
        .filter((proposal) => {
          const matchesSearch =
            proposal.nomeCliente.toLowerCase().includes(debouncedSearch) ||
            proposal.numeroProposta.toLowerCase().includes(debouncedSearch);

          const matchesStatus =
            status === "ALL" || proposal.status === status;

          return matchesSearch && matchesStatus;
        })
        .sort(
          (a, b) =>
            new Date(b.dataUltimoEvento).getTime() -
            new Date(a.dataUltimoEvento).getTime(),
        ),
    [proposals, debouncedSearch, status],
  );

  if (isLoading) {
    return (
      <div>
        <Skeleton width="220px" height="34px" />
        <Skeleton width="320px" height="20px" style={{ marginTop: "8px" }} />
        <Skeleton height="52px" style={{ marginTop: "16px" }} />
        <Skeleton height="360px" style={{ marginTop: "16px" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Typography variant="h1">Painel CORBAN</Typography>
        <Typography variant="body" style={{ marginTop: "8px" }}>
          {error}
        </Typography>
        <Button style={{ marginTop: "16px" }} onClick={() => void retry()}>
          <RotateCcw size={16} aria-hidden="true" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h1">Painel CORBAN</Typography>
      <Typography variant="body">
        Bem-vindo ao painel de controle de propostas.
      </Typography>
      <FilterBar
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />
      <ProposalsTable
        proposals={filteredProposals}
        onRowClick={(proposal) => setSelectedProposal(proposal)}
      />
      <ProposalDetailsDrawer
        proposal={selectedProposal}
        isOpen={selectedProposal !== null}
        onClose={() => setSelectedProposal(null)}
      />
    </div>
  );
}
