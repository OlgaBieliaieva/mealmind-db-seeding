// SECTION ███ DATABASE CLIENT ███
import { PrismaClient } from "@prisma/client";

// NOTE: запобігає створенню багатьох клієнтів у Next.js dev mode
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
