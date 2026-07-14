import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client — sử dụng ở phía browser (React components, hooks)
 *
 * @example
 * import { authClient } from "@repo/auth/client";
 *
 * // Sign in với email/password
 * await authClient.signIn.email({ email, password });
 *
 * // Sign in với Google
 * await authClient.signIn.social({ provider: "google" });
 *
 * // Get session
 * const { data: session } = authClient.useSession();
 *
 * // Sign out
 * await authClient.signOut();
 */
export const authClient = createAuthClient({
  baseURL: process.env["NEXT_PUBLIC_APP_URL"] ?? "http://localhost:3000",
});

export type { Session } from "./index.js";

// Re-export hooks và utilities thường dùng
export const { signIn, signUp, signOut, useSession, getSession } = authClient;
