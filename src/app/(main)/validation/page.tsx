"use client";

import Link from "next/link";

import { Typography } from "@/components/atoms/Typography";
import { useProposals } from "@/hooks/useProposals";

export default function ValidationPage() {
  const { proposals } = useProposals();

  return (
    <div>
      <Typography variant="h1">Validação Operacional</Typography>
      <Typography variant="body">
        Selecione uma proposta para abrir a validação detalhada.
      </Typography>

      <ul>
        {proposals.map((proposal) => (
          <li key={proposal.id}>
            <Link href={`/validation/${proposal.id}`}>
              {proposal.numeroProposta} - {proposal.nomeCliente}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
