import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL?.replace("/api", ""),
  basePath: "/api/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;
