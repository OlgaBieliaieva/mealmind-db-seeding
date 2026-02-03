"use client";

import { useEffect, useState } from "react";
import { NutrientReference } from "@/types/nutrient.dto";

export function useNutrientsReference() {
  const [items, setItems] = useState<NutrientReference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/nutrients/refs")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}
