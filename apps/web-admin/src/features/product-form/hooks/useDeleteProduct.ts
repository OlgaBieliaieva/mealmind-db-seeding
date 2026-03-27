"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteProductHard } from "@/src/shared/api/products/products.api";

export function useDeleteProduct() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProductHard(id),

    onSuccess: () => {
      toast.success("Продукт успішно видалено");

      qc.invalidateQueries({ queryKey: ["products"] });

      router.push("/admin/products");
    },

    onError: () => {
      toast.error("Помилка видалення продукту");
    },
  });
}
