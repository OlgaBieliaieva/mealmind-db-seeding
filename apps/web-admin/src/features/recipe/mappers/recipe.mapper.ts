import { RecipeDTO } from "../types/recipe.dto";
import { RecipeDetailsVM } from "../types/recipe-details.vm";
import { RecipeFormInput } from "../types/recipe-form.input";
import { RecipeInput } from "../types/recipe.input";
import { z } from "zod";
import { RecipeCreateSchema } from "@/features/recipe-form/schemas/recipe.create.schema";

type FormInput = z.input<typeof RecipeCreateSchema>;

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
    output_weight_mode: dto.recipe.output_weight_mode ?? "auto",

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

export function mapRecipeFormToInput(form: FormInput): RecipeInput {
  return {
    recipe: {
      title: form.recipe.title,
      description: form.recipe.description ?? "",

      recipe_type_id: form.recipe.recipe_type_id,

      base_servings: form.recipe.base_servings,
      output_weight_mode: form.recipe.output_weight_mode ?? "auto",
      base_output_weight_g: form.recipe.base_output_weight_g ?? 0,

      difficulty: form.recipe.difficulty as RecipeInput["recipe"]["difficulty"] | undefined,

      prep_time_min: form.recipe.prep_time_min,
      cook_time_min: form.recipe.cook_time_min,
    },

    ingredients: form.ingredients
      .filter((i) => i.product_id && i.quantity_g > 0)
      .map((i, index) => ({
        product_id: i.product_id,
        quantity_g: i.quantity_g,
        is_optional: i.is_optional,
        order_index: index + 1,
      })),

    steps: form.steps
      .filter((s) => s.instruction.trim())
      .map((s, index) => ({
        step_number: index + 1,
        instruction: s.instruction.trim(),
      })),

    cuisine_ids: form.cuisine_ids,
    dietary_tag_ids: form.dietary_tag_ids,
  };
}
