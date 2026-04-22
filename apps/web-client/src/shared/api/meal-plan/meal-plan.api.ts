import { apiFetch } from "@/shared/lib/api/fetcher";
import { MealPlanDTO } from "@/shared/types/meal-plan.types";

export function getMealPlan(params: { date: string; days?: string[] }) {
  const qs = new URLSearchParams();

  qs.set("date", params.date);

  if (params.days?.length) {
    qs.set("days", params.days.join(","));
  }

  return apiFetch<MealPlanDTO>(`/meal-plans?${qs.toString()}`);
}
