import { RecipeIngredientInput } from "@/types/recipe-ingredients.dto";
import { generateUUID } from "@/lib/uuid";

export function mapRecipeIngredientToRow(
  recipeId: string,
  ingredient: RecipeIngredientInput,
) {
  return [
    ingredient.recipe_ingredient_id ?? generateUUID(), // A
    recipeId, // B
    ingredient.product_id, // C
    ingredient.quantity_g, // D
    ingredient.is_optional ?? false, // E
    ingredient.order_index, // F
  ];
}
