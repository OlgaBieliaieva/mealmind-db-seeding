import "dotenv/config";
import { prisma } from "@/lib/db/prisma";
import { seedReferenceTables } from "./seeds/reference/reference_tables.seed";

async function main() {
  console.log("🌱 Seeding database...");

  seedReferenceTables(prisma);
}

main()
  .then(async () => {
    console.log("🌱 Seed finished");

    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
