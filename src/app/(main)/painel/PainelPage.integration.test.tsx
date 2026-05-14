import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "@/test-utils/renderWithTheme";
import { ProposalStatus, type Proposal } from "@/types/Proposal";

import PainelPage from "./page";

jest.mock("@/hooks/useProposals", () => ({
  useProposals: jest.fn(),
}));

const { useProposals } = jest.requireMock("@/hooks/useProposals") as {
  useProposals: jest.Mock;
};

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

describe("PainelPage integration", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    const proposals: Proposal[] = [
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

    useProposals.mockReturnValue({
      proposals,
      isLoading: false,
      error: null,
      lastUpdatedAt: new Date("2026-05-11T12:00:00.000Z"),
      refresh: jest.fn(),
      retry: jest.fn(),
      updateProposalStatus: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("filters table by search term and status", async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay),
    });

    renderWithTheme(<PainelPage />);

    expect(screen.getByText("Carlos Lima")).toBeInTheDocument();
    expect(screen.getByText("Mariana Alves")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(
      "Buscar cliente ou numero da proposta",
    );

    await user.type(searchInput, "mariana");

    act(() => {
      jest.advanceTimersByTime(450);
    });

    expect(screen.getByText("Mariana Alves")).toBeInTheDocument();
    expect(screen.queryByText("Carlos Lima")).not.toBeInTheDocument();

    await user.clear(searchInput);

    act(() => {
      jest.advanceTimersByTime(450);
    });

    const statusSelect = screen.getByRole("combobox");
    await user.selectOptions(statusSelect, ProposalStatus.ASSINADO);

    expect(screen.getByText("Mariana Alves")).toBeInTheDocument();
    expect(screen.queryByText("Carlos Lima")).not.toBeInTheDocument();
  });

  it("renders loading skeletons while proposals are being fetched", () => {
    useProposals.mockReturnValue({
      proposals: [],
      isLoading: true,
      error: null,
      lastUpdatedAt: null,
      refresh: jest.fn(),
      retry: jest.fn(),
      updateProposalStatus: jest.fn(),
    });

    const { container } = renderWithTheme(<PainelPage />);

    expect(screen.queryByText("Painel CORBAN")).not.toBeInTheDocument();
    expect(
      container.querySelectorAll('span[aria-hidden="true"]').length,
    ).toBeGreaterThan(0);
  });

  it("renders error state and retries loading when user clicks retry", async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay),
    });
    const retry = jest.fn();

    useProposals.mockReturnValue({
      proposals: [],
      isLoading: false,
      error: "Não foi possível carregar as propostas.",
      lastUpdatedAt: null,
      refresh: jest.fn(),
      retry,
      updateProposalStatus: jest.fn(),
    });

    renderWithTheme(<PainelPage />);

    expect(
      screen.getByText("Não foi possível carregar as propostas."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("shows requested-document history in the proposal drawer", async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay),
    });

    useProposals.mockReturnValue({
      proposals: [
        createProposal({
          id: "5",
          numeroProposta: "NC-2026-0005",
          nomeCliente: "Rafael Mendonça",
          status: ProposalStatus.AGUARDANDO_DOCUMENTOS,
          documentRequests: [
            {
              id: "5-r1",
              documentType: "COMPROVANTE_RESIDENCIA",
              documentLabel: "Comprovante de residência",
              instructions:
                "Reenviar comprovante emitido nos últimos 90 dias, com endereço completo e sem cortes na imagem.",
              requestedAt: "2026-05-11T09:05:00.000Z",
              requestedBy: "OPERACAO",
            },
          ],
        }),
      ],
      isLoading: false,
      error: null,
      lastUpdatedAt: new Date("2026-05-11T12:00:00.000Z"),
      refresh: jest.fn(),
      retry: jest.fn(),
      updateProposalStatus: jest.fn(),
    });

    renderWithTheme(<PainelPage />);

    await user.click(screen.getByRole("button", { name: /NC-2026-0005/i }));

    expect(screen.getByText("Solicitações de documento")).toBeInTheDocument();
    expect(screen.getByText("Comprovante de residência")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Reenviar comprovante emitido nos últimos 90 dias, com endereço completo e sem cortes na imagem.",
      ),
    ).toBeInTheDocument();
  });
});
