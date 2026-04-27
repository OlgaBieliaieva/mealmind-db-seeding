"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const globalForPrisma = global;
// 🔥 singleton Pool
const pool = globalForPrisma.pgPool ??
    new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
}
// 🔥 adapter
const adapter = new adapter_pg_1.PrismaPg(pool);
// 🔥 singleton Prisma
exports.prisma = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        adapter,
        log: ["error", "warn"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
