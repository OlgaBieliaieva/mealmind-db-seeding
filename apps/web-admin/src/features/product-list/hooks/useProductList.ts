"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useProductFilters } from "@/src/features/product-list/hooks/useProductFilters";
import { searchProducts } from "@/src/shared/api/products/products.api";

export function useProductList() {
  const { filters } = useProductFilters();

  return useQuery({
    queryKey: ["products", filters],

    queryFn: () => searchProducts(filters),

    placeholderData: keepPreviousData,
  });
}
