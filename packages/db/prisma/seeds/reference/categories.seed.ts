import { PrismaClient } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { CategoryRow } from "../types";

export async function seedCategories(prisma: PrismaClient) {
  // Section STEP 1 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // parent categories

  const parents = readCSV<CategoryRow>(
    "./prisma/seeds/data/categories_parent.csv",
  );

  await prisma.category.createMany({
    data: parents.map((row) => ({
      legacyId: Number(row.category_id),
      nameEn: row.name_en,
      nameUa: row.name_ua,
    })),
    skipDuplicates: true,
  });

  // Section STEP 2 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // отримуємо parent categories з БД

  const parentCategories = await prisma.category.findMany({
    where: {
      legacyId: {
        in: parents.map((p) => Number(p.category_id)),
      },
    },
  });

  const parentMap = new Map(parentCategories.map((c) => [c.legacyId, c.id]));

  // Section STEP 3 ━━━━━━━━━━━━━━━━━━━━━━━━━
  // child categories

  const children = readCSV<CategoryRow>(
    "./prisma/seeds/data/categories_child.csv",
  );

  await prisma.category.createMany({
    data: children.map((row) => ({
      legacyId: Number(row.category_id),

      nameEn: row.name_en,
      nameUa: row.name_ua,

      parentId: parentMap.get(Number(row.parent_id)),
    })),
    skipDuplicates: true,
  });
}
