"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/lib/api/api";
import { GenericProduct } from "../types/generic-product.types";

export function useGenericProductSearch(query: string) {
  return useQuery({
    queryKey: ["generic-products-search", query],

    queryFn: () =>
      apiFetch<{ items: GenericProduct[] }>(
        `/api/v1/admin/products/generic?query=${encodeURIComponent(query)}`,
      ),

    enabled: query.length >= 2,
    staleTime: 60_000,
  });
}
