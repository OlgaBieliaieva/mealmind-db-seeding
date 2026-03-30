"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/lib/api/api";
import { GenericProduct } from "../types/generic-product.types";

export function useGenericProductById(id?: string) {
  return useQuery({
    queryKey: ["generic-product", id],
    enabled: !!id,
    queryFn: () =>
      apiFetch<GenericProduct>(`/api/v1/admin/products/generic/${id}`),
  });
}
