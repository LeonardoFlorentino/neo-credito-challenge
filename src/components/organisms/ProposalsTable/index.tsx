import { Badge } from "@/components/atoms/Badge";
import type { Proposal } from "@/types/Proposal";

import { TableContainer, Table } from "./styles";
import {
  StatusIndicator,
  NewIndicator,
  ProposalCellContent,
} from "./Indicators";

type ProposalsTableProps = {
  proposals: Proposal[];
  onRowClick?: (proposal: Proposal) => void;
};

export function ProposalsTable({ proposals, onRowClick }: ProposalsTableProps) {
  // For demo: treat proposals with status ASSINADO as 'newly signed' (show indicator)
  // and proposals with status AGUARDANDO as 'new'.
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
            <tr
              key={proposal.id}
              onClick={() => onRowClick?.(proposal)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onRowClick?.(proposal);
                }
              }}
              tabIndex={0}
              role="button"
            >
              <td>
                <ProposalCellContent>
                  {proposal.status === "AGUARDANDO" && (
                    <NewIndicator>Novo</NewIndicator>
                  )}
                  {proposal.status === "ASSINADO" && (
                    <StatusIndicator title="Concluído" />
                  )}
                  <span>{proposal.numeroProposta}</span>
                </ProposalCellContent>
              </td>
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
