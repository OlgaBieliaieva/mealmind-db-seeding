import { PrismaClient } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { CuisineRow } from "../types";

export async function seedCuisines(prisma: PrismaClient) {
  const rows = readCSV<CuisineRow>("./prisma/seeds/data/cuisines.csv");

  await prisma.cuisine.createMany({
    data: rows.map((row) => ({
      legacyId: Number(row.cuisine_id),
      code: row.code,
      nameEn: row.name_en,
      nameUa: row.name_ua,
      region: row.region,
      isActive: row.is_active === "TRUE" ? true : false,
    })),
    skipDuplicates: true,
  });
}
