import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ErrorPage from "./error";

describe("app/error", () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("renders fallback message and retries on button click", async () => {
    const user = userEvent.setup();
    const unstableRetry = jest.fn();
    const error = new Error("Unexpected route error");

    render(<ErrorPage error={error} unstable_retry={unstableRetry} />);

    expect(
      screen.getByRole("heading", { name: "Não foi possível concluir esta ação" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/falha inesperada/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Tentar novamente" }));

    expect(unstableRetry).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
