import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export async function startMockServiceWorker(): Promise<void> {
	if (process.env.NODE_ENV !== "development") {
		return;
	}

	await worker.start({
		onUnhandledRequest: "bypass",
	});
}
