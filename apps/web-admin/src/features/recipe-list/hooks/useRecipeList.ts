"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRecipeFilters } from "./useRecipeFilters";
import { searchRecipes } from "@/shared/api/recipes/recipes.api";

export function useRecipeList() {
  const { filters } = useRecipeFilters();

  return useQuery({
    queryKey: ["recipes", filters],

    queryFn: () => searchRecipes(filters),

    placeholderData: keepPreviousData,
  });
}
