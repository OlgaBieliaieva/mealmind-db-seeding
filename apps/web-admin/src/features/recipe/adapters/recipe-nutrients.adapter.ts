import { RecipeDetailsVM } from "../types/recipe-details.vm";
import { NutrientReference } from "@/shared/domain/nutrition/nutrient.types";

export type RecipeNutrientRow = {
  id: string;
  code: string;
  label: string;
  total: number;
  per100g: number;
  perServing: number;
  unit: string;
};

export function mapRecipeNutrientsToRows(
  recipe: RecipeDetailsVM,
  refs: NutrientReference[],
): RecipeNutrientRow[] {
  const result: RecipeNutrientRow[] = [];

  for (const ref of refs) {
    const value = recipe.nutrients[ref.nutrient_id];

    if (!value) continue;

    const total = value.value;

    const per100g =
      recipe.outputWeight > 0 ? (total / recipe.outputWeight) * 100 : 0;

    const perServing = recipe.servings > 0 ? total / recipe.servings : 0;

    result.push({
      id: ref.nutrient_id,
      code: ref.code,
      label: ref.name.ua, // 🔥 локалізація тут
      total,
      per100g,
      perServing,
      unit: value.unit || ref.default_unit,
    });
  }

  return result;
}
