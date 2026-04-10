import { RecipeCreateInput } from "../schemas/recipe.create.schema";
import { RecipeInput } from "@/features/recipe/types/recipe.input";
import { RecipeDifficulty } from "@/features/recipe/constants/recipe-difficulty.constants";

export function mapRecipeFormToInput(values: RecipeCreateInput): RecipeInput {
  return {
    recipe: {
      title: values.recipe.title,
      description: values.recipe.description ?? "",

      recipe_type_id: values.recipe.recipe_type_id,
      output_weight_mode: values.recipe.output_weight_mode ?? "auto",
      base_servings: values.recipe.base_servings,
      base_output_weight_g: values.recipe.base_output_weight_g,

      difficulty: values.recipe.difficulty as RecipeDifficulty | undefined,

      prep_time_min: values.recipe.prep_time_min,
      cook_time_min: values.recipe.cook_time_min,
    },

    ingredients: values.ingredients,
    steps: values.steps,
    cuisine_ids: values.cuisine_ids,
    dietary_tag_ids: values.dietary_tag_ids,
  };
}
