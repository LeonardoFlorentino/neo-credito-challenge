import { useMemo } from "react";

import type { User } from "@/types/User";

const mockUser: User = {
  id: "1",
  name: "Ana Souza",
  email: "ana.souza@neo-credito.com",
  role: "analyst",
};

export function useAuth() {
  const isAuthenticated = useMemo(() => true, []);

  return { user: mockUser, isAuthenticated };
}
