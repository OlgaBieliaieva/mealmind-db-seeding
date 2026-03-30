import { apiFetch } from "@/shared/lib/api/api";
import { BrandCreateInput } from "@/features/product-form/schemas/brand.schema";
import { BrandDto } from "@/features/product-form/schemas/brand.schema";

type CreateBrandResponse = {
  brand_id: string;
  name: {
    en: string;
    ua: string;
  };
};

export async function createBrand(data: BrandCreateInput) {
  return apiFetch<CreateBrandResponse>("/brands", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getBrands(): Promise<BrandDto[]> {
  return apiFetch("/brands");
}
