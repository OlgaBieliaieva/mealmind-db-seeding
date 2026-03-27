"use client";

// SECTION ███ NUTRIENTS QUERY ███

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/api";

import { NutrientReference } from "@/apps/web-admin/src/shared/domain/nutrition/nutrient.types";

export function useNutrients() {
  return useQuery({
    queryKey: ["nutrients"],

    queryFn: () => apiFetch<NutrientReference[]>("/api/v2/nutrients"),
  });
}
