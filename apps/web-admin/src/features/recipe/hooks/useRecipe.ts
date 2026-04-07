import { useQuery } from "@tanstack/react-query";
import { getRecipeDetails } from "@/shared/api/recipes/recipes.api";

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetails(id),
  });
}
