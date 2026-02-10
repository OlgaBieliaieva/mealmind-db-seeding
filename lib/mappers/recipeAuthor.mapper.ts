import { generateUUID } from "@/lib/uuid";
import { RecipeAuthor } from "@/types/recipe-author";
import { RecipeAuthorCreateInput } from "@/types/recipe-author-create.dto";

export function mapRecipeAuthorToRow(input: RecipeAuthorCreateInput) {
  const recipeAuthorId = generateUUID();
  const createdAt = new Date().toISOString();

  const author: RecipeAuthor = {
    recipe_author_id: recipeAuthorId,
    type: input.type,
    display_name: input.display_name,
    avatar_url: input.avatar_url ?? null,
    profile_url: input.profile_url ?? null,
    created_at: createdAt,
  };

  const row = [
    author.recipe_author_id,
    author.type,
    author.display_name,
    author.avatar_url ?? "",
    author.profile_url ?? "",
    author.created_at,
  ];

  return {
    recipeAuthorId,
    row,
    author,
  };
}
