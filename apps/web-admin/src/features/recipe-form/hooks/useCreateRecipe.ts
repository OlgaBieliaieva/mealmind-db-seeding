"use client";

import { useMutation } from "@tanstack/react-query";
import { createRecipe } from "@/shared/api/recipes/recipes.api";

export function useCreateRecipe() {
  return useMutation({
    mutationFn: createRecipe,
  });
}
