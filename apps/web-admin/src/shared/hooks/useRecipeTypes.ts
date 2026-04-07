"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipeTypes } from "@/shared/api/recipe-types/recipe-types.api";

export function useRecipeTypes() {
  return useQuery({
    queryKey: ["recipe-types"],
    queryFn: getRecipeTypes,
  });
}
