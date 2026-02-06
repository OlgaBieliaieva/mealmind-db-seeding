"use client";

import { useRecipeFavoritesMap } from "@/lib/hooks/useRecipeFavoritesMap";
import { RecipeFull } from "@/types/recipe-views";
import RecipeView from "@/components/recipe/RecipeView";

const ADMIN_USER_ID = "00000000-0000-0000-0000-000000000000";
const ADMIN_FAMILY_ID = "00000000-0000-0000-0000-000000000000";

export default function RecipePageClient({ data }: { data: RecipeFull }) {
  const { map, toggle } = useRecipeFavoritesMap(ADMIN_USER_ID, ADMIN_FAMILY_ID);

  const isFavorite = Boolean(map[data.recipe.recipe_id]);

  return (
    <RecipeView
      {...data}
      isFavorite={isFavorite}
      onToggleFavorite={() => toggle(data.recipe.recipe_id)}
    />
  );
}
