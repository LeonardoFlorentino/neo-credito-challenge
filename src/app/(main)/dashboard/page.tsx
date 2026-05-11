"use client";

import { useEffect, useMemo, useState } from "react";

import { Typography } from "@/components/atoms/Typography";
import { FilterBar } from "@/components/molecules/FilterBar";
import { ProposalDetailsDrawer } from "@/components/organisms/ProposalDetailsDrawer";
import { ProposalsTable } from "@/components/organisms/ProposalsTable";
import { useProposals } from "@/hooks/useProposals";
import { Proposal, ProposalStatus } from "@/types/Proposal";

export default function DashboardPage() {
  const { proposals } = useProposals();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<ProposalStatus | "ALL">("ALL");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const filteredProposals = useMemo(
    () =>
      proposals.filter((proposal) => {
        const matchesSearch =
          proposal.nomeCliente.toLowerCase().includes(debouncedSearch) ||
          proposal.numeroProposta.toLowerCase().includes(debouncedSearch);

        const matchesStatus = status === "ALL" || proposal.status === status;

        return matchesSearch && matchesStatus;
      }),
    [proposals, debouncedSearch, status],
  );

  return (
    <div>
      <Typography variant="h1">Dashboard CORBAN</Typography>
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
