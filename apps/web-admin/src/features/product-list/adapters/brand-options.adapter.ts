import { BrandDto } from "@/features/product-form/schemas/brand.schema";

export function mapBrandsToOptions(brands: BrandDto[]) {
  console.log(brands);

  return brands.map((b) => ({
    id: b.id,
    label:
      b.country?.toLowerCase() === "україна"
        ? (b.nameUa ?? b.nameEn)
        : (b.nameEn ?? b.nameUa),
  }));
}
