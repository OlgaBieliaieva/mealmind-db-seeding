import { apiFetch } from "@/shared/lib/api/api";
import { Cuisine } from "@/shared/domain/cuisine/cuisine.types";

export function getCuisines(): Promise<Cuisine[]> {
  return apiFetch("/cuisines");
}
