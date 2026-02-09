import { randomUUID } from "crypto";
import { RecipeVideoCreateInput } from "@/types/recipe-video-create.dto";

export function mapRecipeVideoToRow(input: RecipeVideoCreateInput) {
  const recipeVideoId = randomUUID();
  const createdAt = new Date().toISOString();

  return {
    recipeVideoId,
    row: [
      recipeVideoId, // A recipe_video_id
      input.recipe_id, // B recipe_id
      input.platform, // C platform
      input.url, // D url
      input.author_name ?? "", // E author_name
      input.author_url ?? "", // F author_url
      createdAt, // G created_at
    ],
  };
}
