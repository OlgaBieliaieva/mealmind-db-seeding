import { generateUUID } from "@/lib/uuid";
import { RecipeAuthorCreateInput } from "@/types/recipe-author-create.dto";

export function mapRecipeAuthorToRow(input: RecipeAuthorCreateInput) {
  const recipeAuthorId = generateUUID();

  return {
    recipeAuthorId,
    row: [
      recipeAuthorId,
      input.type,
      input.display_name,
      input.avatar_url ?? "",
      input.profile_url ?? "",
      new Date().toISOString(),
    ],
  };
}
