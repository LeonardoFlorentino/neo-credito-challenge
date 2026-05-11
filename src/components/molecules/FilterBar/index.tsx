"use client";

import { Input } from "@/components/atoms/Input";
import { ProposalStatus } from "@/types/Proposal";

import { StyledFilterBar, StyledSelect } from "./styles";

type FilterBarProps = {
  search: string;
  status: ProposalStatus | "ALL";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProposalStatus | "ALL") => void;
};

export function FilterBar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <StyledFilterBar>
      <Input
        placeholder="Buscar cliente ou numero da proposta"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <StyledSelect
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as ProposalStatus | "ALL")
        }
      >
        <option value="ALL">Todos os status</option>
        <option value={ProposalStatus.AGUARDANDO}>Aguardando</option>
        <option value={ProposalStatus.AGUARDANDO_AUDITORIA}>
          Aguardando auditoria
        </option>
        <option value={ProposalStatus.ASSINADO}>Assinado</option>
        <option value={ProposalStatus.RECUSADO}>Recusado</option>
        <option value={ProposalStatus.EXPIRADO}>Expirado</option>
      </StyledSelect>
    </StyledFilterBar>
  );
}
