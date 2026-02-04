"use client";

import { useEffect, useState } from "react";

export type RecipeType = {
  recipe_type_id: number;
  code: string;
  name: {
    en: string;
    ua: string;
  };
};

export function useRecipeTypes() {
  const [items, setItems] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recipe-types")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
