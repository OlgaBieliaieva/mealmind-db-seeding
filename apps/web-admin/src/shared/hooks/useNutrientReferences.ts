"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/lib/api/api";
import { NutrientReference } from "../domain/nutrition/nutrient.types";

export function useNutrientReferences() {
  return useQuery({
    queryKey: ["nutrient-references"],
    queryFn: () =>
      apiFetch<NutrientReference[]>("/api/v1/admin/products/nutrients"),
  });
}
