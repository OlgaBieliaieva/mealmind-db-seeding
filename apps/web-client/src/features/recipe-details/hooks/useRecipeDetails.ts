import { useQuery } from "@tanstack/react-query";
import { getRecipeDetails } from "@/shared/api/recipe-details/recipe-details.api";
import { RecipeDetailsDTO } from "../types/recipe-details.types";

export function useRecipeDetails(id: string) {
  return useQuery<RecipeDetailsDTO>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetails(id),
    enabled: !!id,
  });
}
