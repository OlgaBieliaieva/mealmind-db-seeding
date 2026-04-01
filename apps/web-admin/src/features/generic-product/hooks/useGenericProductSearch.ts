"use client";

import { useQuery } from "@tanstack/react-query";
import { searchGenericProducts } from "@/shared/api/products/products.api";

export function useGenericProductSearch(query: string) {
  return useQuery({
    queryKey: ["generic-products-search", query],

    queryFn: () => searchGenericProducts(query),

    enabled: query.length >= 2,
    staleTime: 60_000,
  });
}
