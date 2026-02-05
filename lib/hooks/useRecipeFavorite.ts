"use client";

import { useEffect, useState } from "react";

type Params = {
  recipeId: string;
  userId: string;
  familyId: string;
};

export function useRecipeFavorite({ recipeId, userId, familyId }: Params) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `/api/recipes/favorites?recipe_id=${recipeId}&user_id=${userId}&family_id=${familyId}`,
    )
      .then((res) => res.json())
      .then((data) => setIsFavorite(Boolean(data.isFavorite)))
      .finally(() => setLoading(false));
  }, [recipeId, userId, familyId]);

  async function toggle() {
    await fetch("/api/recipes/favorites", {
      method: isFavorite ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: recipeId,
        user_id: userId,
        family_id: familyId,
      }),
    });

    setIsFavorite((prev) => !prev);
  }

  return { isFavorite, toggle, loading };
}
