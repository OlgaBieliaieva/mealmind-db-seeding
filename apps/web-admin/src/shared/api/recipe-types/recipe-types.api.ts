import { apiFetch } from "@/shared/lib/api/api";
import { RecipeType } from "@/shared/domain/recipe-type/recipe-type.types";

export function getRecipeTypes(): Promise<RecipeType[]> {
  return apiFetch("/recipe-types");
}
