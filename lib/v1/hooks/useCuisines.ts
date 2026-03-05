"use client";

import { useEffect, useState } from "react";

export type Cuisine = {
  cuisine_id: number;
  code: string;
  name: {
    en: string;
    ua: string;
  };
  region: string;
};

export function useCuisines() {
  const [items, setItems] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cuisines")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
