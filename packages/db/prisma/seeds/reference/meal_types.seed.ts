import { PrismaClient } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { MealTypeRow } from "../types";

export async function seedMealTypes(prisma: PrismaClient) {
  const rows = readCSV<MealTypeRow>("./prisma/seeds/data/meal_types.csv");

  await prisma.mealType.createMany({
    data: rows.map((row) => ({
      legacyId: Number(row.meal_type_id),
      code: row.code,
      nameEn: row.name_en,
      nameUa: row.name_ua,
      orderIndex: Number(row.order_index),
    })),
    skipDuplicates: true,
  });
}
