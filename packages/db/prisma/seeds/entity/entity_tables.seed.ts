import { PrismaClient } from "@prisma/client";
import { seedProducts } from "./products.seed";

export async function seedEntityTables(prisma: PrismaClient) {
  await seedProducts(prisma);
  console.log("✓ Products seeded");
}
