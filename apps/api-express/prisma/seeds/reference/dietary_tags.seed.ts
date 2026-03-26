import { PrismaClient } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { DietaryTagRow } from "../types";

export async function seedDietaryTags(prisma: PrismaClient) {
  const rows = readCSV<DietaryTagRow>("./prisma/seeds/data/dietary_tags.csv");

  await prisma.dietaryTag.createMany({
    data: rows.map((row) => ({
      legacyId: Number(row.dietary_tag_id),
      code: row.code,
      nameEn: row.name_en,
      nameUa: row.name_ua,
      isActive: row.is_active === "TRUE" ? true : false,
    })),
    skipDuplicates: true,
  });
}
