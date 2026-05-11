import { Badge } from "@/components/atoms/Badge";
import { useProposals } from "@/hooks/useProposals";

import { TableContainer, Table } from "./styles";

export function ProposalsTable() {
  const { proposals } = useProposals();

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.numeroProposta}</td>
              <td>{proposal.nomeCliente}</td>
              <td>
                <Badge variant={proposal.status}>{proposal.status}</Badge>
              </td>
              <td>
                {new Date(proposal.dataUltimoEvento).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
