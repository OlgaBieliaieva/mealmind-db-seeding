"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/api";

import { useProductFilters } from "./useProductFilters";

import { ProductListResponse } from "../types/product-list.types";

export function useProductList() {
  const { filters } = useProductFilters();

  return useQuery({
    queryKey: ["products", filters],

    queryFn: () => {
      const params = new URLSearchParams();

      if (filters.query) params.set("query", filters.query);
      if (filters.type) params.set("type", filters.type);
      if (filters.categoryId) params.set("categoryId", filters.categoryId);
      if (filters.brandId) params.set("brandId", filters.brandId);
      if (filters.page) params.set("page", String(filters.page));

      return apiFetch<ProductListResponse>(
        `/api/v2/products?${params.toString()}`,
      );
    },

    placeholderData: keepPreviousData,
  });
}
