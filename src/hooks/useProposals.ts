import { useMemo, useState } from "react";

import { proposalsMock } from "@/services/mocks/proposals";

export function useProposals() {
  const [search, setSearch] = useState("");

  const proposals = useMemo(
    () =>
      proposalsMock.filter((proposal) =>
        proposal.customerName.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return { proposals, search, setSearch };
}
