import { apiFetch } from "@/shared/lib/api/fetcher";

export type MealTypeDTO = {
  id: string;
  code: string;
  name: string;
};

export function getMealTypes() {
  return apiFetch<MealTypeDTO[]>("/meal-types");
}
