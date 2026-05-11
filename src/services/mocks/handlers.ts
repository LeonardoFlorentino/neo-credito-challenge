import { proposalsMock } from "./proposals";

type MockHandler = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  response: unknown;
};

export const handlers: MockHandler[] = [
  {
    method: "GET",
    path: "/api/proposals",
    response: proposalsMock,
  },
];
