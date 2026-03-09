"use client";

import { useEffect, useState } from "react";

export type RecipeListItem = {
  recipe_id: string;
  title: string;
  status: "draft" | "ready" | "published";
  visibility: "private" | "public";
  photo_url?: string | null;
};

export function useRecipes() {
  const [items, setItems] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
