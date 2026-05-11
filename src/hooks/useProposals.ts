import { useMemo } from "react";

import { proposalsMock } from "@/services/mocks/proposals";

export function useProposals() {
  const proposals = useMemo(() => proposalsMock, []);

  return { proposals };
}
