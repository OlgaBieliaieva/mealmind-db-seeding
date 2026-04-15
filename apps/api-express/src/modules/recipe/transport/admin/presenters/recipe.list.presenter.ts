import { Prisma } from "@prisma/client";

type RecipeListRow = Prisma.RecipeGetPayload<{
  include: {
    recipeType: true;
    author: true;
    nutrients: {
      include: {
        nutrient: true;
      };
    };
  };
}>;

export function presentRecipeListItem(recipe: RecipeListRow) {
  const energy = recipe.nutrients.find(
    (n) => n.nutrient.code === "energy_kcal",
  );

  // 👉 вага рецепта (база)
  const weight = recipe.baseOutputWeightG || 0;

  let caloriesPer100g: number | null = null;

  if (energy && weight > 0) {
    caloriesPer100g = (energy.valueTotal / weight) * 100;
  }

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

    // ❌ НЕ треба сирі nutrients
    // nutrients: recipe.nutrients,

    // ✅ нормалізоване поле
    calories_per_100g: caloriesPer100g,
  };
}
