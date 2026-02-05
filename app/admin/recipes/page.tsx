"use client";

import { useRecipes } from "@/lib/hooks/useRecipes";
import { RecipeRow } from "@/components/recipe/RecipeRow";

export default function AdminRecipesPage() {
  const { items, loading } = useRecipes();

  if (loading) {
    return <p className="text-sm text-gray-500">Loading recipes…</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Recipes</h1>

      {items.length === 0 && (
        <p className="text-sm text-gray-500">No recipes yet</p>
      )}

      <div className="space-y-2">
        {items.map((recipe) => (
          <RecipeRow key={recipe.recipe_id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
