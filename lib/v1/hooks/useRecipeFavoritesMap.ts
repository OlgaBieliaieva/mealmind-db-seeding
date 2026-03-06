"use client";

import { useEffect, useState } from "react";

export function useRecipeFavoritesMap(userId: string, familyId: string) {
  const [map, setMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/recipes/favorites?user_id=${userId}&family_id=${familyId}`)
      .then((r) => r.json())
      .then((d) => setMap(d.map ?? {}));
  }, [userId, familyId]);

  async function toggle(recipeId: string) {
    const isFav = Boolean(map[recipeId]);

    await fetch("/api/recipes/favorites", {
      method: isFav ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_id: recipeId,
        user_id: userId,
        family_id: familyId,
      }),
    });

    setMap((prev) => ({
      ...prev,
      [recipeId]: !isFav,
    }));
  }

  return { map, toggle };
}
