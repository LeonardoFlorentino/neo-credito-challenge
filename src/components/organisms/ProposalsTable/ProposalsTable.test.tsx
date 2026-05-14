import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "@/test-utils/renderWithTheme";
import { ProposalStatus, type Proposal } from "@/types/Proposal";

import { ProposalsTable } from "./index";

function createProposal(overrides: Partial<Proposal>): Proposal {
  return {
    id: "1",
    numeroProposta: "NC-2026-0001",
    nomeCliente: "Carlos Lima",
    cpfCliente: "123.456.789-10",
    status: ProposalStatus.AGUARDANDO,
    dataUltimoEvento: "2026-05-11T12:00:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0001",
    dataEnvio: "2026-05-10T13:20:00.000Z",
    tentativasContato: [],
    documentRequests: [],
    dossie: {
      selfieUrl: "https://cdn.local/selfie.jpg",
      documentoUrl: "https://cdn.local/documento.pdf",
      similaridade: 0.93,
      ipOrigem: "177.44.20.11",
      geolocalizacao: { lat: -23.55, lng: -46.63 },
    },
    ...overrides,
  };
}

describe("ProposalsTable", () => {
  it("renders proposals and status badges", () => {
    const proposals = [
      createProposal({
        id: "1",
        numeroProposta: "NC-2026-0001",
        nomeCliente: "Carlos Lima",
        status: ProposalStatus.AGUARDANDO,
      }),
      createProposal({
        id: "2",
        numeroProposta: "NC-2026-0002",
        nomeCliente: "Mariana Alves",
        status: ProposalStatus.ASSINADO,
      }),
    ];

    renderWithTheme(<ProposalsTable proposals={proposals} />);

    expect(
      screen.getByRole("columnheader", { name: "Cliente" }),
    ).toBeInTheDocument();
    expect(screen.getByText("NC-2026-0001")).toBeInTheDocument();
    expect(screen.getByText("Carlos Lima")).toBeInTheDocument();
    expect(screen.getByText("ASSINADO")).toBeInTheDocument();
    expect(screen.getByText("Novo")).toBeInTheDocument();
    expect(screen.getByTitle("Assinatura concluída")).toBeInTheDocument();
  });

  it("calls onRowClick when a row is clicked", async () => {
    const user = userEvent.setup();
    const proposal = createProposal({ id: "10", nomeCliente: "Joana Teste" });
    const onRowClick = jest.fn();

    renderWithTheme(
      <ProposalsTable proposals={[proposal]} onRowClick={onRowClick} />,
    );

    await user.click(screen.getByRole("button", { name: /NC-2026-0001/i }));

    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "10" }),
    );
  });
});
