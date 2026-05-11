import type { Proposal } from "@/types/Proposal";

import { Table } from "./styles";

type ProposalsTableProps = {
  proposals: Proposal[];
};

export function ProposalsTable({ proposals }: ProposalsTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {proposals.map((proposal) => (
          <tr key={proposal.id}>
            <td>{proposal.id}</td>
            <td>{proposal.customerName}</td>
            <td>{proposal.status}</td>
            <td>{proposal.amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
