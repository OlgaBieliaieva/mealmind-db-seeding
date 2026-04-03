"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/shared/api/products/products.api";
import { AdminUpdateProductInput } from "../types/product.update.schema";

type UpdateArgs = {
  id: string;
  data: Partial<AdminUpdateProductInput>;
};

export function useUpdateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateArgs) => updateProduct(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
