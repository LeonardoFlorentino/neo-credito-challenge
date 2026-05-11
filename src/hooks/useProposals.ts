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

  const loadProposals = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchProposalsMock();
      setProposals(data);
    } catch {
      setError("Não foi possível carregar as propostas.");
    } finally {
      setIsLoading(false);
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

  return { proposals, isLoading, error, retry: loadProposals, updateProposalStatus };
}
