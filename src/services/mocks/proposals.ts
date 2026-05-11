import type { Proposal } from "@/types/Proposal";

export const proposalsMock: Proposal[] = [
  {
    id: "P-1001",
    customerName: "Carlos Lima",
    amount: 15000,
    status: "pending",
  },
  {
    id: "P-1002",
    customerName: "Mariana Alves",
    amount: 22000,
    status: "approved",
  },
];
