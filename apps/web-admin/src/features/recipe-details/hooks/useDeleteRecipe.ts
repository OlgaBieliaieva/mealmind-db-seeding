"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteRecipeHard } from "@/shared/api/recipes/recipes.api";

export function useDeleteRecipe() {
  const qc = useQueryClient();

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["recipes"] });
  }

  return useMutation({
    mutationFn: deleteRecipeHard,
    onSuccess: () => {
      toast.success("Рецепт видалено");
      invalidate();
    },
    onError: () => {
      toast.error("Помилка при видаленні");
    },
  });
}
