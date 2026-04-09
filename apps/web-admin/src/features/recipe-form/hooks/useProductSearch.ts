"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/shared/api/products/products.api";

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: ["product-search", query],
    queryFn: () =>
      searchProducts({
        query,
        limit: 10,
      }),
    enabled: query.length >= 2,
  });
}
