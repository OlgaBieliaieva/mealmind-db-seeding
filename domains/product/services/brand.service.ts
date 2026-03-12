import { brandRepository } from "../repositories/brand.repository";
import { BrandCreateInput } from "../schemas/brand.schema";

export async function getBrands() {
  const rows = await brandRepository.findAll();

  return rows.map((b) => ({
    brand_id: b.id,
    name: {
      en: b.nameEn,
      ua: b.nameUa,
    },
    country: b.country,
  }));
}

export async function createBrand(data: BrandCreateInput) {
  return brandRepository.create(data);
}
