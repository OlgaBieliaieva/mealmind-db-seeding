"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/src/shared/api/products/products.api";

import { ProductInput } from "../schemas/product.schema";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductInput) => createProduct(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
