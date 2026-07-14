import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables — chỉ accessible trên server
   */
  server: {
    DATABASE_URL: z.string().url("DATABASE_URL phải là URL hợp lệ"),
    BETTER_AUTH_SECRET: z
      .string()
      .min(32, "BETTER_AUTH_SECRET phải ít nhất 32 ký tự"),
    BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL phải là URL hợp lệ"),
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID là bắt buộc"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET là bắt buộc"),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Client-side environment variables — exposed ra browser
   * Phải có prefix NEXT_PUBLIC_
   */
  client: {
    NEXT_PUBLIC_APP_URL: z
      .string()
      .url("NEXT_PUBLIC_APP_URL phải là URL hợp lệ"),
  },

  /**
   * Map process.env vào các field trên
   * Cần khai báo tường minh để Next.js bundle đúng
   */
  runtimeEnv: {
    DATABASE_URL: process.env["DATABASE_URL"],
    BETTER_AUTH_SECRET: process.env["BETTER_AUTH_SECRET"],
    BETTER_AUTH_URL: process.env["BETTER_AUTH_URL"],
    GOOGLE_CLIENT_ID: process.env["GOOGLE_CLIENT_ID"],
    GOOGLE_CLIENT_SECRET: process.env["GOOGLE_CLIENT_SECRET"],
    NODE_ENV: process.env["NODE_ENV"],
    NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
  },

  /**
   * Bỏ qua validation khi build (Vercel build không có env vars)
   */
  skipValidation: !!process.env["SKIP_ENV_VALIDATION"],

  /**
   * Empty string được coi là undefined
   */
  emptyStringAsUndefined: true,
});
