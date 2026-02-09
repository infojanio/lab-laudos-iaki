/**
 * Auth service - simulates authentication.
 * Replace with real API calls when backend is ready.
 */

import { User } from "@/types";
import { mockClients } from "./mockData";

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const ADMIN_EMAIL = "admin@labanalytica.com";

export const authService = {
  async loginClient(email: string): Promise<User | null> {
    await delay(800);
    const client = mockClients.find((c) => c.email === email);
    if (!client) return null;
    return { id: client.id, email: client.email, name: client.name, role: "client" };
  },

  async loginAdmin(email: string, password: string): Promise<User | null> {
    await delay(800);
    // Mock: accept admin@labanalytica.com with any password
    if (email === ADMIN_EMAIL) {
      return { id: "admin1", email, name: "Administrador", role: "admin" };
    }
    return null;
  },

  async logout(): Promise<void> {
    await delay(200);
  },
};
