import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "@/test-utils/renderWithTheme";
import { ProposalStatus, type Proposal } from "@/types/Proposal";

import ValidacaoPorIdPage from "./page";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  notFound: jest.fn(),
}));

jest.mock("@/hooks/useProposals", () => ({
  useProposals: jest.fn(),
}));

const navigationMock = jest.requireMock("next/navigation") as {
  useParams: jest.Mock;
  notFound: jest.Mock;
};

const { useProposals } = jest.requireMock("@/hooks/useProposals") as {
  useProposals: jest.Mock;
};

function createProposal(overrides: Partial<Proposal>): Proposal {
  return {
    id: "1",
    numeroProposta: "NC-2026-0001",
    nomeCliente: "Carlos Lima",
    cpfCliente: "123.456.789-10",
    status: ProposalStatus.ASSINADO,
    dataUltimoEvento: "2026-05-11T12:00:00.000Z",
    assinaturaUrl: "https://assinatura.neo-credito.local/NC-2026-0001",
    dataEnvio: "2026-05-10T13:20:00.000Z",
    tentativasContato: [
      {
        id: "1-1",
        channel: "WHATSAPP",
        timestamp: "2026-05-10T13:30:00.000Z",
        outcome: "SEM_RESPOSTA",
      },
    ],
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

describe("ValidacaoPorIdPage US-02 integration", () => {
  beforeEach(() => {
    navigationMock.useParams.mockReturnValue({ id: "1" });
    navigationMock.notFound.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("opens approval modal and confirms approval flow", async () => {
    const user = userEvent.setup();
    const updateProposalStatus = jest.fn().mockReturnValue(true);

    useProposals.mockReturnValue({
      proposals: [createProposal({ status: ProposalStatus.ASSINADO })],
      isLoading: false,
      error: null,
      retry: jest.fn(),
      updateProposalStatus,
      requestNewDocument: jest.fn(),
    });

    renderWithTheme(<ValidacaoPorIdPage />);

    await user.click(screen.getByRole("button", { name: "Aprovar validação" }));

    expect(
      screen.getByRole("heading", { name: "Confirmar aprovação" }),
    ).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    await user.click(confirmButton);

    expect(updateProposalStatus).toHaveBeenCalledWith(
      "1",
      ProposalStatus.AGUARDANDO_AUDITORIA,
    );
    expect(
      screen.getByText("Proposta atualizada para AGUARDANDO AUDITORIA."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Confirmar aprovação" }),
    ).not.toBeInTheDocument();
  });

  it("opens reject modal, validates required fields, and confirms rejection", async () => {
    const user = userEvent.setup();
    const updateProposalStatus = jest.fn().mockReturnValue(true);

    useProposals.mockReturnValue({
      proposals: [createProposal({ status: ProposalStatus.ASSINADO })],
      isLoading: false,
      error: null,
      retry: jest.fn(),
      updateProposalStatus,
      requestNewDocument: jest.fn(),
    });

    renderWithTheme(<ValidacaoPorIdPage />);

    await user.click(screen.getByRole("button", { name: "Reprovar proposta" }));

    expect(
      screen.getByRole("heading", { name: "Informar Pendência" }),
    ).toBeInTheDocument();

    const confirmRejectButton = screen.getByRole("button", {
      name: "Confirmar reprovação",
    });
    expect(confirmRejectButton).toBeDisabled();

    await user.selectOptions(
      screen.getByRole("combobox"),
      "DIVERGENCIA_BIOMETRICA",
    );
    await user.type(
      screen.getByPlaceholderText("Descreva a pendência encontrada"),
      "Selfie divergente do documento apresentado.",
    );

    expect(confirmRejectButton).toBeEnabled();

    await user.click(confirmRejectButton);

    expect(updateProposalStatus).toHaveBeenCalledWith(
      "1",
      ProposalStatus.RECUSADO,
    );
    expect(
      screen.getByText("Proposta atualizada para RECUSADO."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Informar Pendência" }),
    ).not.toBeInTheDocument();
  });

  it("opens request-document modal, validates required fields, and confirms the request", async () => {
    const user = userEvent.setup();
    const requestNewDocument = jest.fn().mockReturnValue(true);

    useProposals.mockReturnValue({
      proposals: [createProposal({ status: ProposalStatus.ASSINADO })],
      isLoading: false,
      error: null,
      retry: jest.fn(),
      updateProposalStatus: jest.fn(),
      requestNewDocument,
    });

    renderWithTheme(<ValidacaoPorIdPage />);

    await user.click(
      screen.getByRole("button", { name: "Solicitar novo documento" }),
    );

    expect(
      screen.getByRole("heading", { name: "Solicitar novo documento" }),
    ).toBeInTheDocument();

    const confirmRequestButton = screen.getByRole("button", {
      name: "Confirmar solicitação",
    });
    expect(confirmRequestButton).toBeDisabled();

    await user.selectOptions(
      screen.getByRole("combobox"),
      "SELFIE_COM_DOCUMENTO",
    );
    await user.type(
      screen.getByPlaceholderText(
        "Explique o ajuste necessário para o reenvio",
      ),
      "Enviar nova selfie segurando o documento original, com bordas visíveis.",
    );

    expect(confirmRequestButton).toBeEnabled();

    await user.click(confirmRequestButton);

    expect(requestNewDocument).toHaveBeenCalledWith("1", {
      documentType: "SELFIE_COM_DOCUMENTO",
      instructions:
        "Enviar nova selfie segurando o documento original, com bordas visíveis.",
    });
    expect(
      screen.getByText("Proposta atualizada para AGUARDANDO DOCUMENTOS."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Solicitar novo documento" }),
    ).not.toBeInTheDocument();
  });

  it("keeps approval and rejection disabled when proposal is not signed", () => {
    useProposals.mockReturnValue({
      proposals: [createProposal({ status: ProposalStatus.AGUARDANDO })],
      isLoading: false,
      error: null,
      retry: jest.fn(),
      updateProposalStatus: jest.fn(),
      requestNewDocument: jest.fn(),
    });

    renderWithTheme(<ValidacaoPorIdPage />);

    expect(
      screen.getByRole("button", { name: "Aprovar validação" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Reprovar proposta" }),
    ).toBeDisabled();
    expect(
      screen.getByText(
        "A validação do dossiê fica habilitada apenas quando a proposta estiver com status ASSINADO.",
      ),
    ).toBeInTheDocument();
  });

  it("renders loading state with skeleton placeholders", () => {
    useProposals.mockReturnValue({
      proposals: [],
      isLoading: true,
      error: null,
      retry: jest.fn(),
      updateProposalStatus: jest.fn(),
      requestNewDocument: jest.fn(),
    });

    const { container } = renderWithTheme(<ValidacaoPorIdPage />);

    expect(screen.queryByText("Validação da Proposta")).not.toBeInTheDocument();
    expect(
      container.querySelectorAll('span[aria-hidden="true"]').length,
    ).toBeGreaterThan(0);
  });

  it("renders error state and allows retry", async () => {
    const user = userEvent.setup();
    const retry = jest.fn();

    useProposals.mockReturnValue({
      proposals: [],
      isLoading: false,
      error: "Não foi possível carregar as propostas.",
      retry,
      updateProposalStatus: jest.fn(),
      requestNewDocument: jest.fn(),
    });

    renderWithTheme(<ValidacaoPorIdPage />);

    expect(
      screen.getByText("Não foi possível carregar as propostas."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });
});
