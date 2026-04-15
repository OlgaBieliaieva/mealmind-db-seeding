"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipeAuthor } from "@/shared/api/recipe-authors/recipe-authors.api";
import { CreateRecipeAuthorInput } from "@/shared/domain/recipe-authors/recipe-authors.types";

export function useCreateRecipeAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRecipeAuthorInput) => createRecipeAuthor(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipe-authors"],
      });
    },
  });
}
