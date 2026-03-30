"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useProductFilters } from "@/features/product-list/hooks/useProductFilters";
import { searchProducts } from "@/shared/api/products/products.api";

export function useProductList() {
  const { filters } = useProductFilters();

  return useQuery({
    queryKey: ["products", filters],

    queryFn: () => searchProducts(filters),

    placeholderData: keepPreviousData,
  });
}
