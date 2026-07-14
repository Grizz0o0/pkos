import { authClient } from "@repo/auth/client";

/**
 * Re-export authClient và hooks từ @repo/auth/client
 * để dùng trong components của apps/web
 *
 * @example
 * import { signIn, signOut, useSession } from "@/lib/auth-client";
 */
export const { signIn, signUp, signOut, useSession, getSession } = authClient;
export { authClient };
