import { useCallback, useEffect, useState } from "react";

import {
  fetchProposalsMock,
  proposalsMock,
  updateProposalStatusMock,
} from "@/services/mocks/proposals";
import { ProposalStatus } from "@/types/Proposal";

export function useProposals() {
  const [proposals, setProposals] = useState(() => [...proposalsMock]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  const loadProposals = useCallback(async (background = false) => {
    if (!background) {
      setIsLoading(true);
      setError(null);
    }

    try {
      const data = await fetchProposalsMock();
      setProposals(data);
      setError(null);
      setLastUpdatedAt(new Date());
    } catch {
      if (!background) {
        setError("Não foi possível carregar as propostas.");
      }
    } finally {
      if (!background) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadProposals();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadProposals]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      void loadProposals(true);
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [loadProposals]);

  const updateProposalStatus = useCallback(
    (id: string, status: ProposalStatus) => {
      const updatedProposal = updateProposalStatusMock(id, status);

      if (!updatedProposal) {
        return false;
      }

      setProposals((currentProposals) =>
        currentProposals.map((proposal) =>
          proposal.id === id ? updatedProposal : proposal,
        ),
      );

      return true;
    },
    [],
  );

  return {
    proposals,
    isLoading,
    error,
    lastUpdatedAt,
    retry: () => loadProposals(),
    refresh: () => loadProposals(true),
    updateProposalStatus,
  };
}
