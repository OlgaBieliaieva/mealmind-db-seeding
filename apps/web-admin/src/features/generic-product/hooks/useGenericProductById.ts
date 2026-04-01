"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "@/shared/api/products/products.api";
import { mapToGenericProduct } from "../mappers/mapProductDetailsToGenericProduct";

export function useGenericProductById(id?: string) {
  return useQuery({
    queryKey: ["generic-product", id],
    enabled: !!id,
    queryFn: async () => {
      const dto = await getProductDetails(id!);
      return mapToGenericProduct(dto);
    },
  });
}
