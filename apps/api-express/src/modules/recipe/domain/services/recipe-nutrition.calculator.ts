type IngredientWithNutrients = {
  quantityG: number;
  product: {
    nutrients: {
      nutrientId: string;
      valuePer100g: number;
      unit: string | null;
    }[];
  };
};

export type CalculatedNutrient = {
  nutrientId: string;
  valueTotal: number;
  unit: string;
};

export class RecipeNutritionCalculator {
  static calculate(
    ingredients: IngredientWithNutrients[],
  ): CalculatedNutrient[] {
    const totals = new Map<string, { value: number; unit: string }>();

    for (const ingredient of ingredients) {
      for (const n of ingredient.product.nutrients) {
        const value = (n.valuePer100g * ingredient.quantityG) / 100;

        if (!totals.has(n.nutrientId)) {
          totals.set(n.nutrientId, {
            value: 0,
            unit: n.unit ?? "",
          });
        }

        totals.get(n.nutrientId)!.value += value;
      }
    }

    return Array.from(totals.entries()).map(([nutrientId, v]) => ({
      nutrientId,
      valueTotal: v.value,
      unit: v.unit,
    }));
  }
}
