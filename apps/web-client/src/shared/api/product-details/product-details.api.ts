import { apiFetch } from "@/shared/lib/api/fetcher";
import { ProductDetailsDTO } from "@/features/product-details/types/product-details.types";
import { ProductRecipesResponse } from "@/features/product-details/types/product-details.types";

export function getProductDetails(id: string) {
  return apiFetch<ProductDetailsDTO>(`/products/${id}`);
}

export function getProductRecipes(productId: string, page: number, limit = 20) {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  return apiFetch<ProductRecipesResponse>(
    `/products/${productId}/recipes?${params.toString()}`,
  );
}
