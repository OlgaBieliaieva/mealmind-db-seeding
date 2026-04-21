import {
  PrismaClient,
  ProductState,
  ProductType,
  ProductUnit,
} from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { ProductRow } from "../types";

export async function seedProducts(prisma: PrismaClient) {
  // Section STEP 1 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // generic products

  const generic = readCSV<ProductRow>(
    "./prisma/seeds/data/products_generic.csv",
  );

  // Section STEP 2 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // отримуємо categories з БД

  const categories = await prisma.category.findMany();

  const categoryMap = new Map(categories.map((c) => [c.legacyId, c.id]));

  // Section STEP 3 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // створюємо записи generic products

  await prisma.product.createMany({
    data: generic.map((row) => ({
      legacyId: row.product_id,

      nameEn: row.name_en,
      nameUa: row.name_ua,

      type: row.type as ProductType,

      categoryId: row.subcategory
        ? categoryMap.get(Number(row.subcategory))!
        : categoryMap.get(Number(row.category))!,

      unit: row.unit as ProductUnit,

      ediblePartPct: row.edible_part_pct ? Number(row.edible_part_pct) : null,
      yieldFactor: row.yield_factor ? Number(row.yield_factor) : null,
      cookingLossPct: row.cooking_loss_pct
        ? Number(row.cooking_loss_pct)
        : null,

      rawOrCookedDefault: row.raw_or_cooked_default as ProductState,

      source: row.source,

      isVerified: false,

      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    skipDuplicates: true,
  });

  // Section STEP 4 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // отримуємо brands з БД

  const brands = await prisma.brand.findMany();
  const brandMap = new Map(brands.map((b) => [b.legacyId, b.id]));

  // Section STEP 5 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // отримуємо generic products з БД

  const genericProducts = await prisma.product.findMany({
    where: {
      legacyId: {
        in: generic.map((g) => g.product_id),
      },
    },
  });

  const genericMap = new Map(genericProducts.map((g) => [g.legacyId, g.id]));

  // Section STEP 6 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // branded products

  const branded = readCSV<ProductRow>(
    "./prisma/seeds/data/products_branded.csv",
  );

  await prisma.product.createMany({
    data: branded.map((row) => ({
      legacyId: row.product_id,

      nameEn: row.name_en,
      nameUa: row.name_ua,

      type: row.type as ProductType,

      brandId: brandMap.get(row.brand),

      barcode: row.barcode,

      parentProductId: genericMap.get(row.parent_product_id),

      categoryId: row.subcategory
        ? categoryMap.get(Number(row.subcategory))!
        : categoryMap.get(Number(row.category))!,

      unit: row.unit as ProductUnit,

      ediblePartPct: row.edible_part_pct ? Number(row.edible_part_pct) : null,

      yieldFactor: row.yield_factor ? Number(row.yield_factor) : null,

      cookingLossPct: row.cooking_loss_pct
        ? Number(row.cooking_loss_pct)
        : null,

      rawOrCookedDefault: row.raw_or_cooked_default
        ? (row.raw_or_cooked_default as ProductState)
        : "raw",

      source: row.source,

      isVerified: false,

      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    skipDuplicates: true,
  });
}
