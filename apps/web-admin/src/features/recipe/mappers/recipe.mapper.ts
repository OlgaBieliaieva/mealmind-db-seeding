import { RecipeDTO } from "../types/recipe.dto";
import { RecipeDetailsVM } from "../types/recipe-details.vm";
import { RecipeFormInput } from "../types/recipe-form.input";
import { RecipeInput } from "../types/recipe.input";

export function mapRecipeDtoToVM(dto: RecipeDTO): RecipeDetailsVM {
  return {
    id: dto.recipe.recipe_id,
    title: dto.recipe.title,
    description: dto.recipe.description,

    status: dto.recipe.status,
    visibility: dto.recipe.visibility,

    photoUrl: dto.recipe.photo_url,

    type: dto.recipe.recipe_type_name,
    difficulty: dto.recipe.difficulty,

    prepTime: dto.recipe.prep_time_min,
    cookTime: dto.recipe.cook_time_min,

    servings: dto.recipe.base_servings,
    outputWeight: dto.recipe.base_output_weight_g,

    ingredients: dto.ingredients.map((i) => ({
      id: i.id,
      name: i.product_name,
      quantity: i.quantity_g,
      isOptional: i.is_optional,
    })),

    steps: dto.steps.map((s) => ({
      id: s.id,
      text: s.text,
    })),

    cuisines: dto.cuisines.map((c) => c.name),
    dietaryTags: dto.dietary_tags.map((d) => d.name),

    nutrients: dto.nutrients,
  };
}

export function mapRecipeFormToInput(form: RecipeFormInput): RecipeInput {
  return {
    recipe: {
      title: form.title,
      description: form.description,

      recipe_type_id: form.recipeTypeId,

      base_servings: form.servings,
      base_output_weight_g: form.outputWeight ?? 0,

      difficulty: form.difficulty,

      prep_time_min: form.prepTime,
      cook_time_min: form.cookTime,
    },

    ingredients: form.ingredients
      .filter((i) => i.productId && i.quantity > 0)
      .map((i, index) => ({
        product_id: i.productId!,
        quantity_g: i.quantity,
        is_optional: i.isOptional,
        order_index: index + 1,
      })),

    steps: form.steps
      .filter((s) => s.text.trim())
      .map((s, index) => ({
        step_number: index + 1,
        instruction: s.text.trim(),
      })),

    cuisine_ids: form.cuisineIds,
    dietary_tag_ids: form.dietaryTagIds,
  };
}
