import { http, HttpResponse } from "msw";

import { proposalsMock } from "./proposals";

export const handlers = [
  http.get("/proposals", () => {
    return HttpResponse.json({ proposals: proposalsMock });
  }),
];
