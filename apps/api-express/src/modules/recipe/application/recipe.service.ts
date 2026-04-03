import { recipeRepository } from "../domain/persistence/recipe.repository";
import { CreateRecipeDTO } from "../dto/create-recipe.dto";
import {
  RecipeIngredientInput,
  RecipeStepInput,
} from "../transport/admin/types/recipe.types";

export async function createRecipe(data: CreateRecipeDTO) {
  return recipeRepository.create({
    title: data.recipe.title,
    description: data.recipe.description,

    baseServings: data.recipe.base_servings,
    baseOutputWeightG: data.recipe.base_output_weight_g,

    difficulty: data.recipe.difficulty,

    prepTimeMin: data.recipe.prep_time_min,
    cookTimeMin: data.recipe.cook_time_min,

    recipeType: data.recipe.recipe_type_id
      ? {
          connect: { id: data.recipe.recipe_type_id },
        }
      : undefined,

    ingredients: {
      create: data.ingredients.map((i: RecipeIngredientInput) => ({
        productId: i.product_id,
        quantityG: i.quantity_g,
        isOptional: i.is_optional,
        orderIndex: i.order_index,
      })),
    },

    steps: {
      create: data.steps.map((s: RecipeStepInput) => ({
        stepNumber: s.step_number,
        instruction: s.instruction,
        timerSec: s.timer_sec,
      })),
    },

    cuisines: {
      create: data.cuisine_ids.map((id: string) => ({
        cuisineId: id,
      })),
    },

    dietaryTags: {
      create: data.dietary_tag_ids.map((id: string) => ({
        dietaryTagId: id,
      })),
    },
  });
}
