export type ProposalStatus = "approved" | "pending" | "rejected";

export interface Proposal {
  id: string;
  customerName: string;
  amount: number;
  status: ProposalStatus;
}
