// TODO DELETE after refactor
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/api";
import { ProductInput } from "../schemas/product.schema";

export function useUpdateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInput }) =>
      apiFetch(`/api/v2/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
