import { Brand } from "../types/brand.types";

export type BrandOption = {
  id: string;
  label: string;
};

export function mapBrandsToOptions(brands: Brand[]): BrandOption[] {
  return brands.map((b) => ({
    id: b.brand_id,
    label:
      b.country?.toLowerCase() === "україна"
        ? (b.name.ua ?? b.name.en)
        : (b.name.en ?? b.name.ua),
  }));
}
