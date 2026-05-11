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
          <th>Numero da Proposta</th>
          <th>Cliente</th>
          <th>Status</th>
          <th>Ultimo Evento</th>
        </tr>
      </thead>
      <tbody>
        {proposals.map((proposal) => (
          <tr key={proposal.id}>
            <td>{proposal.id}</td>
            <td>{proposal.numeroProposta}</td>
            <td>{proposal.nomeCliente}</td>
            <td>{proposal.status}</td>
            <td>{new Date(proposal.dataUltimoEvento).toLocaleString("pt-BR")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
