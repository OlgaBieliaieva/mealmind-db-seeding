import { NutrientsMap } from "@/shared/domain/nutrition/nutrient-value.types";

type IngredientInput = {
  product_id: string;
  quantity_g: number;
};

export function aggregateRecipeNutrients(
  ingredients: IngredientInput[],
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
