import { PrismaClient } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { ProductNutrientRow } from "../types";

export async function seedProductNutrients(prisma: PrismaClient) {
  // Section STEP 1 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // product nutrients
  const rows = readCSV<ProductNutrientRow>(
    "./prisma/seeds/data/product_nutrients.csv",
  );
  // Section STEP 2 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // отримуємо products з БД

  const products = await prisma.product.findMany();
  const productMap = new Map(
    products.filter((p) => p.legacyId).map((p) => [p.legacyId as string, p.id]),
  );

  // Section STEP 3 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // отримуємо nutrients з БД

  const nutrients = await prisma.nutrient.findMany();
  const nutrientMap = new Map(
    nutrients.filter((n) => n.legacyId).map((n) => [n.legacyId, n.id]),
  );

  // Section STEP 4 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // створюємо записи product nutrients

  await prisma.productNutrient.createMany({
    data: rows.map((row) => {
      const productId = productMap.get(row.product_id);

      if (!productId) {
        throw new Error(`Product not found legacyId=${row.product_id}`);
      }
      const nutrientId = nutrientMap.get(Number(row.nutrient_id));

      if (!nutrientId) {
        throw new Error(`Nutrient not found legacyId=${row.nutrient_id}`);
      }
      return {
        legacyId: row.product_nutrient_id,
        productId,
        nutrientId,
        valuePer100g: Number(row.value_per_100g.replace(",", ".")),
        valuePerServing: Number(row.value_per_serving.replace(",", ".")),
        unit: row.unit,
        source: row.source,
        isEstimated: false,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      };
    }),
    skipDuplicates: true,
  });
}
