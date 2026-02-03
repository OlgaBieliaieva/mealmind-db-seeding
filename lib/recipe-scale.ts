import { RecipeIngredientDraft } from "@/types/recipe-ingredient";
import { NutrientsMap } from "@/types/nutrients";

export type ScaleBy =
  | {
      type: "servings";
      targetServings: number;
    }
  | {
      type: "weight";
      targetWeight: number;
    };

export type ScaledRecipe = {
  scaleFactor: number;

  ingredients: RecipeIngredientDraft[];

  nutrients: NutrientsMap;

  targetServings: number;
  targetWeight: number;
};

export function scaleRecipe(
  ingredients: RecipeIngredientDraft[],
  baseServings: number,
  baseWeight: number,
  baseNutrients: NutrientsMap,
  scaleBy: ScaleBy,
): ScaledRecipe {
  if (baseServings <= 0) {
    throw new Error("baseServings must be > 0");
  }

  if (baseWeight <= 0) {
    throw new Error("baseWeight must be > 0");
  }

  const scaleFactor =
    scaleBy.type === "servings"
      ? scaleBy.targetServings / baseServings
      : scaleBy.targetWeight / baseWeight;

  if (!Number.isFinite(scaleFactor) || scaleFactor <= 0) {
    throw new Error("Invalid scale factor");
  }

  // 1️⃣ Масштабуємо інгредієнти
  const scaledIngredients: RecipeIngredientDraft[] = ingredients.map(
    (ingredient) => ({
      ...ingredient,
      quantity_g: Math.round(ingredient.quantity_g * scaleFactor),
    }),
  );

  // 2️⃣ Масштабуємо нутрієнти (ЗАГАЛЬНІ)
  const scaledNutrients: NutrientsMap = {};

  for (const [nutrientId, nutrient] of Object.entries(baseNutrients)) {
    scaledNutrients[nutrientId] = {
      value: nutrient.value * scaleFactor,
      unit: nutrient.unit,
    };
  }

  // 3️⃣ Виводимо таргетні значення
  const targetServings =
    scaleBy.type === "servings"
      ? scaleBy.targetServings
      : baseServings * scaleFactor;

  const targetWeight =
    scaleBy.type === "weight" ? scaleBy.targetWeight : baseWeight * scaleFactor;

  return {
    scaleFactor,
    ingredients: scaledIngredients,
    nutrients: scaledNutrients,
    targetServings,
    targetWeight,
  };
}
