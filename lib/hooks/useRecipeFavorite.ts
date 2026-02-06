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
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(
      `/api/recipes/favorites?recipe_id=${recipeId}&user_id=${userId}&family_id=${familyId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setIsFavorite(Boolean(data.isFavorite));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [recipeId, userId, familyId]);

  async function toggle() {
    if (toggling) return;

    setToggling(true);

    const method = isFavorite ? "DELETE" : "POST";

    await fetch("/api/recipes/favorites", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: recipeId,
        user_id: userId,
        family_id: familyId,
      }),
    });

    setIsFavorite((prev) => !prev);
    setToggling(false);
  }

  return { isFavorite, toggle, loading };
}
