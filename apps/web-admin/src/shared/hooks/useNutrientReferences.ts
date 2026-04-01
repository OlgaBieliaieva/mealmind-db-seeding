"use client";

import { useQuery } from "@tanstack/react-query";
import { getNutrientReferences } from "../api/nutrients/nutrients.api";

export function useNutrientReferences() {
  return useQuery({
    queryKey: ["nutrient-references"],
    queryFn: getNutrientReferences,
  });
}
