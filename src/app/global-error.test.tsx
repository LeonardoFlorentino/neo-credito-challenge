import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import GlobalErrorPage from "./global-error";

describe("app/global-error", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("renders global fallback and retries on button click", async () => {
    const user = userEvent.setup();
    const unstableRetry = jest.fn();
    const error = new Error("Critical root error");

    render(<GlobalErrorPage error={error} unstable_retry={unstableRetry} />);

    expect(
      screen.getByRole("heading", { name: "Erro crítico na aplicação" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/não foi possível renderizar a interface principal/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));

    expect(unstableRetry).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
