import { NutrientsMap } from "@/types/nutrients";
import { RecipeIngredientDraft } from "@/types/recipe-ingredient";

/**
 * Агрегує нутрієнти рецепта на основі інгредієнтів.
 * Всі нутрієнти рахуються відносно 100 г продукту.
 */
export function aggregateRecipeNutrients(
  ingredients: RecipeIngredientDraft[],
  productNutrientsMap: Record<string, NutrientsMap>,
): NutrientsMap {
  const result: NutrientsMap = {};

  for (const ingredient of ingredients) {
    if (!ingredient.product_id || ingredient.quantity_g <= 0) {
      continue;
    }

    const nutrients = productNutrientsMap[ingredient.product_id];
    if (!nutrients) continue;

    const factor = ingredient.quantity_g / 100;

    Object.entries(nutrients).forEach(([nutrientId, nutrientValue]) => {
      const prev = result[nutrientId]?.value ?? 0;

      result[nutrientId] = {
        value: prev + nutrientValue.value * factor,
        unit: nutrientValue.unit,
      };
    });
  }

  return result;
}
