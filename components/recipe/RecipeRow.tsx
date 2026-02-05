"use client";

import Link from "next/link";
import { useRecipeFavorite } from "@/lib/hooks/useRecipeFavorite";
import { RecipeListItem } from "@/lib/hooks/useRecipes";

type Props = {
  recipe: RecipeListItem;
};

// TODO auth
const ADMIN_USER_ID = "00000000-0000-0000-0000-000000000000";
const ADMIN_FAMILY_ID = "00000000-0000-0000-0000-000000000000";

export function RecipeRow({ recipe }: Props) {
  const { isFavorite, toggle } = useRecipeFavorite({
    recipeId: recipe.recipe_id,
    userId: ADMIN_USER_ID,
    familyId: ADMIN_FAMILY_ID,
  });

  return (
    <div className="flex items-center justify-between rounded border p-3">
      <div>
        <div className="font-medium">{recipe.title}</div>
        <div className="text-xs text-gray-500">
          {recipe.status} · {recipe.visibility}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="text-xl"
          title="Favorite"
        >
          {isFavorite ? "⭐" : "☆"}
        </button>

        <Link
          href={`/admin/recipes/${recipe.recipe_id}/edit`}
          className="text-sm underline"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
