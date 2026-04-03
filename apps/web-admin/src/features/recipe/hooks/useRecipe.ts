// useRecipe.ts

import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/shared/api/recipes/recipes.api";

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
  });
}
