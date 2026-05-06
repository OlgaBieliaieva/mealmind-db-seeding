import { apiFetch } from "@/shared/lib/api/fetcher";
import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";

export function getRecipeDetails(id: string) {
  return apiFetch<RecipeDetailsDTO>(`/recipes/${id}`);
}
