import api from "@/lib/axios";
import { authClient } from "@/lib/auth-client";

export const authService = {
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  logout: async () => {
    // Try Better Auth sign out first (for Google OAuth users)
    try {
      await authClient.signOut();
    } catch {
      // Better Auth sign out may fail if no session exists
    }
    // Also clear JWT cookie via existing endpoint
    try {
      await api.post("/auth/logout");
    } catch {
      // May fail if no JWT cookie
    }
  },

  /**
   * Get current user. Checks JWT auth first, then Better Auth session.
   */
  getMe: async () => {
    // 1. Try JWT-based auth (email/password login)
    try {
      const response = await api.get("/auth/me");
      if (response.data?.user) {
        return response.data.user;
      }
    } catch {
      // JWT auth failed, try Better Auth
    }

    // 2. Try Better Auth session (Google OAuth login)
    try {
      const { data: session } = await authClient.getSession();
      if (session?.user) {
        return {
          _id: session.user.id,
          name: session.user.name || "",
          email: session.user.email || "",
          photoURL: session.user.image || "",
          role: session.user.role || "user",
        };
      }
    } catch {
      // No session at all
    }

    throw new Error("Not authenticated");
  },
};
