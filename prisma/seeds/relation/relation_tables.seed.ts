import { PrismaClient } from "@prisma/client";
import { seedProductPhotos } from "./product_photos.seed";
import { seedProductNutrients } from "./product_nutrients.seed";

export async function seedRelationTables(prisma: PrismaClient) {
  await seedProductPhotos(prisma);
  console.log("✓ Product photos seeded");

  await seedProductNutrients(prisma);
  console.log("✓ Product nutrients seeded");
}
