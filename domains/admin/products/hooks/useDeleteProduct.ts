"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useDeleteProduct() {
  const router = useRouter();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/v2/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }
    },

    onSuccess: () => {
      toast.success("Продукт успешно удален");

      qc.invalidateQueries({ queryKey: ["products"] });

      router.push("/admin/products");
    },

    onError: () => {
      toast.error("Помилка видалення продукту");
    },
  });
}
