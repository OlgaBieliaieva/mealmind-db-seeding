import { apiFetch } from "@/shared/lib/api/api";
import { NutrientReference } from "@/shared/domain/nutrition/nutrient.types";

export function getNutrientReferences() {
  return apiFetch<NutrientReference[]>("/nutrients");
}
