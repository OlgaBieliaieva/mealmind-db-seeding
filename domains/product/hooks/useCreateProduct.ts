// TODO DELETE after refactor
"use client";

// SECTION ███ CREATE PRODUCT MUTATION ███

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/api";

import { ProductInput } from "../schemas/product.schema";

type CreateProductResponse = {
  success: boolean;
  product_id: string;
};

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<CreateProductResponse, Error, ProductInput>({
    mutationFn: (data) =>
      apiFetch<CreateProductResponse>("/api/v2/products", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
