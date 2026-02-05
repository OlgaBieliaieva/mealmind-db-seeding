import { RecipeCreatePayload } from "@/types/recipe";
import { RecipeIngredientDraft } from "@/types/recipe-ingredient";
import { RecipeStepDraft } from "@/types/recipe-step";

export type RecipeValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateRecipeForPublish(
  recipe: RecipeCreatePayload,
  ingredients: RecipeIngredientDraft[],
  steps: RecipeStepDraft[],
  options: {
    cuisineIds: number[];
    dietaryTagIds?: number[];
  },
): RecipeValidationResult {
  const errors: string[] = [];

  if (!recipe.title.trim()) {
    errors.push("Вкажіть назву рецепта");
  }

  if (!recipe.description.trim()) {
    errors.push("Вкажіть опис рецепта");
  }

  if (!recipe.recipe_type_id) {
    errors.push("Оберіть тип рецепта");
  }

  if (!recipe.photo_url) {
    errors.push("Рекомендується додати фото рецепта");
  }

  if (options.cuisineIds.length === 0) {
    errors.push("Рекомендуємо вказати кухню рецепта");
  }

  if (
    recipe.prep_time_min === undefined &&
    recipe.cook_time_min === undefined
  ) {
    errors.push("Рекомендується вказати час приготування");
  }

  if (recipe.base_servings <= 0) {
    errors.push("Кількість порцій має бути більшою за 0");
  }

  if (recipe.base_output_weight_g <= 0) {
    errors.push("Вкажіть вагу готової страви");
  }

  const validIngredients = ingredients.filter(
    (i) => i.product_id && i.quantity_g > 0,
  );

  if (validIngredients.length === 0) {
    errors.push("Додайте хоча б один інгредієнт з кількістю");
  }

  if (steps.length === 0) {
    errors.push("Додайте хоча б один крок приготування");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
