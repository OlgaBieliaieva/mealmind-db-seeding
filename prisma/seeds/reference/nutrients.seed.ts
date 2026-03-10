import { PrismaClient, NutrientGroup } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { NutrientRow } from "../types";

export async function seedNutrients(prisma: PrismaClient) {
  const rows = readCSV<NutrientRow>("./prisma/seeds/data/nutrients.csv");

  await prisma.nutrient.createMany({
    data: rows.map((row) => ({
      legacyId: Number(row.nutrient_id),
      code: row.code,
      nameEn: row.name_en,
      nameUa: row.name_ua,
      defaultUnit: row.default_unit,
      nutrientGroup: row.nutrient_group as NutrientGroup,
      sortOrder: Number(row.sort_order),
      rdaValue: Number(row.rda_value),
      rdaUnit: row.rda_unit,
      notes: row.notes,
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
      updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
    })),
    skipDuplicates: true,
  });
}
