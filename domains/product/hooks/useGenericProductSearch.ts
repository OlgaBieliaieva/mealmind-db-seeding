"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/api";
import { GenericProduct } from "../types/generic-product.types";

export function useGenericProductSearch(query: string) {
  return useQuery({
    queryKey: ["generic-products-search", query],
    queryFn: () =>
      apiFetch<{ items: GenericProduct[] }>(
        `/api/v2/products/generic?query=${encodeURIComponent(query)}`,
      ),

    enabled: query.length >= 2,
    staleTime: 60_000,
  });
}