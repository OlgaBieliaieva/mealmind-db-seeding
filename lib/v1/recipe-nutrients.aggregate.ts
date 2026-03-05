import { NutrientsMap } from "@/types/nutrients";
import { IngredientForNutrition } from "@/types/recipe-ingredient";

/**
 * Агрегує нутрієнти рецепта на основі інгредієнтів.
 * Всі нутрієнти рахуються відносно 100 г продукту.
 */
export function aggregateRecipeNutrients(
  ingredients: IngredientForNutrition[],
  productNutrientsMap: Record<string, NutrientsMap>,
): NutrientsMap {
  const result: NutrientsMap = {};

  for (const ingredient of ingredients) {
    const nutrients = productNutrientsMap[ingredient.product_id];
    if (!nutrients) continue;

    for (const [nutrientId, data] of Object.entries(nutrients)) {
      if (!result[nutrientId]) {
        result[nutrientId] = {
          value: 0,
          unit: data.unit,
        };
      }

      result[nutrientId].value += (data.value * ingredient.quantity_g) / 100;
    }
  }

  return result;
}
