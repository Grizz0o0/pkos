import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Prisma singleton pattern để tránh hot-reload tạo nhiều connections
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

import { parse } from "pg-connection-string";

const connectionOptions = (process.env["DATABASE_URL"]
  ? parse(process.env["DATABASE_URL"])
  : {}) as pg.PoolConfig;

if (typeof connectionOptions.password === "string") {
  connectionOptions.password = decodeURIComponent(connectionOptions.password);
}

// Khởi tạo connection pool thông qua pg driver
const pool = new pg.Pool(connectionOptions);

// Tạo adapter tương thích với Prisma 7
const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env["NODE_ENV"] === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env["NODE_ENV"] !== "production") {
  globalForPrisma.prisma = db;
}
