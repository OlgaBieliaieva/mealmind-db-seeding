import { apiFetch } from "@/shared/lib/api/fetcher";

export type SearchItemDTO = {
  id: string;
  type: "recipe" | "product";
  name: string;
  photoUrl?: string;
};

export type SearchResponse = {
  items: SearchItemDTO[];
  total: number;
  page: number;
  limit: number;
};

export function searchRecipes(query?: string) {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  params.append("page", "1");
  params.append("limit", "20");

  return apiFetch<SearchResponse>(`/recipes/search?${params.toString()}`);
}

export function searchProducts(query?: string) {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  params.append("page", "1");
  params.append("limit", "20");

  return apiFetch<SearchResponse>(`/products/search?${params.toString()}`);
}
