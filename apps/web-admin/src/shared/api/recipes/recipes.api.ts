import { apiFetch } from "@/shared/lib/api/api";

import { RecipeDTO } from "@/features/recipe/types/recipe.dto";
import { RecipeInput } from "@/features/recipe/types/recipe.input";
import { RecipeListResponse } from "@/features/recipe-list/types/recipe-list.types";

// ===== SEARCH =====

export function searchRecipes(params: {
  query?: string;
  recipe_type_id?: string;
  cuisine_id?: string;
  dietary_tag_id?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      qs.append(k, String(v));
    }
  });

  return apiFetch<RecipeListResponse>(`/recipes/search?${qs.toString()}`);
}

// ===== DETAILS =====

export function getRecipeDetails(id: string) {
  return apiFetch<RecipeDTO>(`/recipes/${id}`);
}

// ===== CREATE =====

export function createRecipe(body: RecipeInput) {
  return apiFetch<{ recipe_id: string }>(`/recipes`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ===== DELETE =====

export function deleteRecipeHard(id: string) {
  return apiFetch<void>(`/recipes/${id}/hard`, {
    method: "DELETE",
  });
}
