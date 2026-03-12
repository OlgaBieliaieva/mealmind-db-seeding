import { prisma } from "@/lib/db/prisma";
import { BrandCreateInput } from "../schemas/brand.schema";

export const brandRepository = {
  async findAll() {
    return prisma.brand.findMany({
      orderBy: {
        nameUa: "asc",
      },
    });
  },

  async create(data: BrandCreateInput) {
    const created = await prisma.brand.create({
      data: {
        nameEn: data.name.en,
        nameUa: data.name.ua,
        country: data.country,
        website: data.website,
        notes: data.notes,
        isVerified: data.is_verified ?? false,
      },
    });

    return {
      brand_id: created.id,
      name: {
        en: created.nameEn,
        ua: created.nameUa,
      },
    };
  },
};
