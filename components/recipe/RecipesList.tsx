"use client";

import { RecipeRow } from "@/components/recipe/RecipeRow";
import { useRecipeFavoritesMap } from "@/lib/hooks/useRecipeFavoritesMap";

const ADMIN_USER_ID = "00000000-0000-0000-0000-000000000000";
const ADMIN_FAMILY_ID = "00000000-0000-0000-0000-000000000000";

type Props = {
  items: {
    recipe_id: string;
    title: string;
    status: string;
    visibility: string;
    photo_url?: string | null;
  }[];
};

export default function RecipesList({ items }: Props) {
  const { map, toggle } = useRecipeFavoritesMap(ADMIN_USER_ID, ADMIN_FAMILY_ID);

  if (items.length === 0) {
    return <p className="text-sm text-gray-500">No recipes yet</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((recipe) => (
        <RecipeRow
          key={recipe.recipe_id}
          recipe={recipe}
          isFavorite={Boolean(map[recipe.recipe_id])}
          onToggleFavorite={() => toggle(recipe.recipe_id)}
        />
      ))}
    </div>
  );
}
