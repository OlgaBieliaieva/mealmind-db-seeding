"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsNutrients } from "@/shared/api/products/products.api";

export function useProductsNutrients(productIds: string[]) {
  return useQuery({
    queryKey: ["products-nutrients", productIds],
    queryFn: () => getProductsNutrients(productIds),
    enabled: productIds.length > 0,
  });
}
