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

export function searchRecipes(query?: string, page = 1) {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  params.append("page", String(page));
  params.append("limit", "20");

  return apiFetch<SearchResponse>(`/recipes/search?${params.toString()}`);
}

export function searchCookbook(query?: string, page = 1) {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  params.append("page", String(page));
  params.append("limit", "20");

  return apiFetch<SearchResponse>(`/recipes/cookbook?${params.toString()}`);
}

export function searchProducts(query?: string, page = 1) {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  params.append("page", String(page));
  params.append("limit", "20");

  return apiFetch<SearchResponse>(`/products/search?${params.toString()}`);
}
