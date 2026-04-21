import { PrismaClient } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { RecipeTypeRow } from "../types";

export async function seedRecipeTypes(prisma: PrismaClient) {
  const rows = readCSV<RecipeTypeRow>("./prisma/seeds/data/recipe_types.csv");

  await prisma.recipeType.createMany({
    data: rows.map((row) => ({
      legacyId: Number(row.recipe_type_id),
      code: row.code,
      nameEn: row.name_en,
      nameUa: row.name_ua,
      notes: row.notes,
    })),
    skipDuplicates: true,
  });
}
