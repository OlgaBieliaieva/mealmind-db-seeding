"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/shared/api/products/products.api";
import { ProductInput } from "../schemas/product.schema";

export function useUpdateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInput }) =>
      updateProduct(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
