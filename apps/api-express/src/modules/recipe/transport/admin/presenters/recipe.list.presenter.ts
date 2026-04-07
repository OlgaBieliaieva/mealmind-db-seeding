import { Prisma } from "@prisma/client";

type RecipeListRow = Prisma.RecipeGetPayload<{
  include: {
    recipeType: true;
    author: true;
  };
}>;

export function presentRecipeListItem(recipe: RecipeListRow) {
  return {
    recipe_id: recipe.id,
    title: recipe.title,
    status: recipe.status,
    visibility: recipe.visibility,

    recipe_type: recipe.recipeType?.nameUa ?? null,

    difficulty: recipe.difficulty ?? null,

    prep_time_min: recipe.prepTimeMin ?? null,
    cook_time_min: recipe.cookTimeMin ?? null,

    photo_url: recipe.photoUrl ?? null,

    author: recipe.author?.displayName ?? null,

    created_at: recipe.createdAt,
  };
}