import { apiFetch } from "@/src/shared/lib/api/api";
import { BrandCreateInput } from "@/src/features/product-form/schemas/brand.schema";
import { BrandDto } from "@/src/features/product-form/schemas/brand.schema";

type CreateBrandResponse = {
  brand_id: string;
  name: {
    en: string;
    ua: string;
  };
};

export async function createBrand(data: BrandCreateInput) {
  return apiFetch<CreateBrandResponse>("/api/v1/admin/brands", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getBrands(): Promise<BrandDto[]> {
  return apiFetch("/api/v1/admin/brands");
}
