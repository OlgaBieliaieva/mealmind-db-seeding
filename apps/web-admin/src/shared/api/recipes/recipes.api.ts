import { RecipeDTO } from "@/features/recipe/types/recipe.dto";
import { RecipeInput } from "@/features/recipe/types/recipe.input";

export async function getRecipe(id: string): Promise<RecipeDTO> {
  const res = await fetch(`/api/recipes/${id}`);
  return res.json();
}

export async function createRecipe(input: RecipeInput) {
  const res = await fetch(`/api/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return res.json();
}