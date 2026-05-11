import { useCallback, useState } from "react";

import {
  proposalsMock,
  updateProposalStatusMock,
} from "@/services/mocks/proposals";
import { ProposalStatus } from "@/types/Proposal";

export function useProposals() {
  const [proposals, setProposals] = useState(() => [...proposalsMock]);

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

  return { proposals, updateProposalStatus };
}
