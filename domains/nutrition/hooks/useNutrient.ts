"use client";

// SECTION ███ NUTRIENTS QUERY ███

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/api";

import { NutrientReference } from "@/domains/shared/types/nutrient.types";

export function useNutrients() {
  return useQuery({
    queryKey: ["nutrients"],

    queryFn: () => apiFetch<NutrientReference[]>("/api/v2/nutrients"),
  });
}
