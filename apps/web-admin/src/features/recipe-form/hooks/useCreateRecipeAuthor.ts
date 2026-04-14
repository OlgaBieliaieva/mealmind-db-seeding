"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createRecipeAuthor,
  CreateRecipeAuthorInput,
} from "@/shared/api/recipe-authors/recipe-authors.api";

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
