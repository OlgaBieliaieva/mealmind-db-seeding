"use client";

import { useEffect, useState } from "react";

export type UICategoryNode = {
  category_id: number;
  name: {
    en: string;
    ua: string;
  };
  children: UICategoryNode[];
};

export function useCategories() {
  const [categories, setCategories] = useState<UICategoryNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
