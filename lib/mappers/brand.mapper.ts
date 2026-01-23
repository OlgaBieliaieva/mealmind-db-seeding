import { BrandInput } from "@/types/brand.schema";
import { generateUUID } from "@/lib/uuid";

export function mapBrandToRow(brand: BrandInput) {
  const brandId = brand.brand_id ?? generateUUID();
  const now = new Date().toISOString();

  const row = [
    brandId, // brand_id
    brand.name.en, // name_en
    brand.name.ua, // name_ua
    brand.country ?? null, // country
    brand.website ?? null, // website
    brand.is_verified ?? false,
    brand.notes ?? null,
    now,
    now,
  ];

  return { brandId, row };
}
