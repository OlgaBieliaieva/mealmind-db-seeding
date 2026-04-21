import { PrismaClient } from "@prisma/client";
import { readCSV } from "../utils/readCSV";
import { BrandRow } from "../types";

export async function seedBrands(prisma: PrismaClient) {
  const rows = readCSV<BrandRow>("./prisma/seeds/data/brands.csv");

  await prisma.brand.createMany({
    data: rows.map((row) => ({
      legacyId: row.brand_id,
      nameEn: row.name_en,
      nameUa: row.name_ua,
      country: row.country,
      website: row.website,
      isVerified: row.is_verified === "TRUE" ? true : false,
      notes: row.notes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
    skipDuplicates: true,
  });
}
