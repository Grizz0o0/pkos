import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@repo/db";
import { env } from "@repo/env";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  /**
   * Email & Password authentication
   */
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Bật lên sau khi setup email service
  },

  /**
   * Google OAuth
   */
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  /**
   * Session config
   */
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 ngày
    updateAge: 60 * 60 * 24, // Refresh mỗi ngày nếu còn active
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // Cache cookie 5 phút
    },
  },

  /**
   * User model config
   */
  user: {
    additionalFields: {
      // Thêm custom fields sau khi có business requirements rõ ràng
    },
  },
});

/**
 * Type exports
 */
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
