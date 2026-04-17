import { RecipeDTO } from "../types/recipe.dto";
import { RecipeDetailsVM } from "../types/recipe-details.vm";
import { RecipeInput } from "../types/recipe.input";
import { RecipeFormInput } from "@/features/recipe-form/forms/recipe-form.context";
import { z } from "zod";
import { RecipeCreateSchema } from "@/features/recipe-form/schemas/recipe.create.schema";

type FormInput = z.input<typeof RecipeCreateSchema>;

export function mapRecipeDtoToVM(dto: RecipeDTO): RecipeDetailsVM {
  return {
    id: dto.recipe.recipe_id,
    title: dto.recipe.title,
    description: dto.recipe.description ?? "",

    status: dto.recipe.status,
    visibility: dto.recipe.visibility,

    photoUrl: dto.recipe.photo_url ?? null,

    type: dto.recipe.recipe_type_name ?? null,
    difficulty: dto.recipe.difficulty ?? null,

    prepTime: dto.recipe.prep_time_min ?? null,
    cookTime: dto.recipe.cook_time_min ?? null,

    servings: dto.recipe.base_servings,
    outputWeight: dto.recipe.base_output_weight_g,
    output_weight_mode: dto.recipe.output_weight_mode ?? "auto",

    // ✅ AUTHOR
    author: dto.author
      ? {
          name: dto.author.display_name,
          avatarUrl: dto.author.avatar_url,
          profileUrl: dto.author.profile_url,
          type: dto.author.type,
        }
      : null,

    // ✅ TAGS
    cuisines: dto.cuisines.map((c) => c.name),
    dietaryTags: dto.dietary_tags.map((d) => d.name),

    // ✅ INGREDIENTS
    ingredients: dto.ingredients.map((i) => ({
      id: i.id,
      name: i.product_name,
      brand: i.brand_name ?? null,
      quantity: i.quantity_g,
      isOptional: i.is_optional,
    })),

    // ✅ STEPS
    steps: dto.steps.map((s) => ({
      id: s.id,
      text: s.text,
    })),

    // ✅ NUTRIENTS (вже нормалізовані бекендом)
    nutrients: dto.nutrients ?? {},

    // ✅ VIDEOS
    videos:
      dto.videos?.map((v) => ({
        id: v.recipe_video_id,
        platform: v.platform,
        url: v.url,
        author: v.author
          ? {
              name: v.author.display_name,
              profileUrl: v.author.profile_url,
            }
          : undefined,
      })) ?? [],
  };
}

/* ========================================================= */

export function mapRecipeFormToInput(form: FormInput): RecipeInput {
  return {
    recipe: {
      title: form.recipe.title,
      description: form.recipe.description ?? "",

      recipe_type_id: form.recipe.recipe_type_id,
      recipe_author_id: form.recipe.recipe_author_id,

      base_servings: form.recipe.base_servings,
      output_weight_mode: form.recipe.output_weight_mode ?? "auto",
      base_output_weight_g: form.recipe.base_output_weight_g ?? 0,

      difficulty: form.recipe.difficulty as
        | RecipeInput["recipe"]["difficulty"]
        | undefined,

      prep_time_min: form.recipe.prep_time_min,
      cook_time_min: form.recipe.cook_time_min,

      photo_url: form.recipe.photo_url,
    },

    ingredients: form.ingredients
      .filter((i) => i.product_id && i.quantity_g > 0)
      .map((i, index) => ({
        product_id: i.product_id!,
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

    cuisine_ids: form.cuisine_ids ?? [],
    dietary_tag_ids: form.dietary_tag_ids ?? [],

    videos: form.videos ?? [],
  };
}

/* ========================================================= */

export function mapRecipeDtoToForm(dto: RecipeDTO): RecipeFormInput {
  return {
    recipe: {
      title: dto.recipe.title,
      description: dto.recipe.description ?? "",

      recipe_type_id: dto.recipe.recipe_type_id ?? undefined,
      recipe_author_id: dto.recipe.recipe_author_id ?? undefined,

      base_servings: dto.recipe.base_servings,

      output_weight_mode: dto.recipe.output_weight_mode ?? "auto",
      base_output_weight_g: dto.recipe.base_output_weight_g ?? undefined,

      difficulty: dto.recipe.difficulty ?? undefined,

      prep_time_min: dto.recipe.prep_time_min ?? undefined,
      cook_time_min: dto.recipe.cook_time_min ?? undefined,

      photo_url: dto.recipe.photo_url ?? undefined,
    },

    ingredients: dto.ingredients.map((i) => ({
      product_id: i.product_id,
      quantity_g: i.quantity_g,
      is_optional: i.is_optional,
      order_index: i.order,

      // 🔥 для UI
      product_name: i.product_name,
      product_brand: i.brand_name ?? null,
    })),

    steps: dto.steps.map((s) => ({
      step_number: s.order,
      instruction: s.text,
    })),

    cuisine_ids: dto.cuisines.map((c) => String(c.cuisine_id)),
    dietary_tag_ids: dto.dietary_tags.map((d) => String(d.dietary_tag_id)),

    videos: dto.videos?.map((v) => ({
      id: v.recipe_video_id,
      platform: v.platform,
      url: v.url,
      recipe_author_id: v.author?.recipe_author_id ?? undefined,
    })),
  };
}
