type RecipeListItem = {
  id: string;
  title: string;
  photoUrl: string | null;
  prepTimeMin: number | null;
  cookTimeMin: number | null;
  difficulty: "easy" | "medium" | "hard" | null;
  baseServings: number;
  baseOutputWeightG: number;
  recipeType?: {
    code: string;
  } | null;
};

export function presentRecipeListItemClient(recipe: RecipeListItem) {
  return {
    id: recipe.id,
    type: "recipe",

    name: recipe.title,
    photoUrl: recipe.photoUrl ?? undefined,

    totalTime: (recipe.prepTimeMin ?? 0) + (recipe.cookTimeMin ?? 0),
    difficulty: recipe.difficulty ?? undefined,

    categoryCode: recipe.recipeType?.code,

    portions: recipe.baseServings,
    totalWeight: recipe.baseOutputWeightG,
    unit: "g",
  };
}
