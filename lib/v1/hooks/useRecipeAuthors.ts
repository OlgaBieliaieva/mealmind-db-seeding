"use client";

import { useEffect, useState } from "react";
import { RecipeAuthor } from "@/types/recipe-author";

export function useRecipeAuthors() {
  const [items, setItems] = useState<RecipeAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recipes-authors/list")
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
