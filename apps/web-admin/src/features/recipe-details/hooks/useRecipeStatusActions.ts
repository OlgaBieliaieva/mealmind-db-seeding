"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  publishRecipe,
  archiveRecipe,
  restoreRecipe,
} from "@/shared/api/recipes/recipes.api";

export function useRecipeStatusActions() {
  const qc = useQueryClient();

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["recipes"] });
    qc.invalidateQueries({ queryKey: ["recipe-details"] });
  }

  function handleSuccess(message: string) {
    toast.success(message);
    invalidate();
  }

  const publish = useMutation({
    mutationFn: publishRecipe,
    onSuccess: () => handleSuccess("Рецепт опубліковано"),
  });

  const archive = useMutation({
    mutationFn: archiveRecipe,
    onSuccess: () => handleSuccess("Рецепт архівовано"),
  });

  const restore = useMutation({
    mutationFn: restoreRecipe,
    onSuccess: () => handleSuccess("Рецепт відновлено"),
  });

  return {
    publish,
    archive,
    restore,
  };
}
