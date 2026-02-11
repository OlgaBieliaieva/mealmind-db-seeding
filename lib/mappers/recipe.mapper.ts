import { RecipeDraftInput } from "@/types/recipe-create.dto";
import { generateUUID } from "@/lib/uuid";

export function mapRecipeDraftToRow(input: RecipeDraftInput) {
  const now = new Date().toISOString();
  const recipeId = input.recipe_id ?? generateUUID();

  const row = [
    recipeId, // A recipe_id
    input.title ?? "", // B title
    input.description ?? "", // C description
    input.recipe_type_id ?? null, // D recipe_type_id

    "admin", // E author_type (поки що)
    null, // F author_user_id
    input.recipe_author_id ?? null, // додано G recipe_author_id

    input.visibility ?? "private", // G visibility
    input.family_id ?? null, // H family_id

    "draft", // I status

    input.base_servings ?? 1, // J base_servings
    input.base_output_weight_g ?? 0, // K base_output_weight_g
    input.container_weight_g ?? null, // L container_weight_g

    input.prep_time_min ?? 0,
    input.cook_time_min ?? 0,
    input.difficulty ?? null,
    input.photo_url ?? null,

    now, // Q created_at
    now, // R updated_at
  ];

  return { recipeId, row };
}
