import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getRecipeDetails } from "@/shared/api/recipe-details/recipe-details.api";
import { RecipeDetailsDTO } from "../types/recipe-details.types";

type Options = Omit<UseQueryOptions<RecipeDetailsDTO>, "queryKey" | "queryFn">;

export function useRecipeDetails(id?: string, options?: Options) {
  return useQuery<RecipeDetailsDTO>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
