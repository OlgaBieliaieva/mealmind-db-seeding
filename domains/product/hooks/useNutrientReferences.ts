"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/api";
import { NutrientReference } from "@/domains/shared/types/nutrient.types";

export function useNutrientReferences() {
  return useQuery({
    queryKey: ["nutrient-references"],
    queryFn: () => apiFetch<NutrientReference[]>("/api/v2/nutrients"),
  });
}
