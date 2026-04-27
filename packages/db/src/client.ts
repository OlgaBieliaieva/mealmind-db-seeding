import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

// =========================
// POOL (singleton)
// =========================

const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
}

// =========================
// PRISMA
// =========================

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";

// const globalForPrisma = global as unknown as {
//   prisma?: PrismaClient;
//   pgPool?: Pool;
// };

// // 🔥 singleton Pool
// const pool =
//   globalForPrisma.pgPool ??
//   new Pool({
//     connectionString: process.env.DATABASE_URL,
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.pgPool = pool;
// }

// // 🔥 adapter
// const adapter = new PrismaPg(pool);

// // 🔥 singleton Prisma
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     log: ["error", "warn"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
