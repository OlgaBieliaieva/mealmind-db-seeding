import { apiFetch } from "@/shared/lib/api/fetcher";
import { MealPlanResponseDTO } from "@/shared/types/meal-plan.types";

export function getMealPlan(params: { date: string; days?: string[] }) {
  const qs = new URLSearchParams();

  qs.set("date", params.date);

  if (params.days?.length) {
    qs.set("days", params.days.join(","));
  }

  return apiFetch<MealPlanResponseDTO>(`/meal-plans?${qs.toString()}`);
}
export async function toggleMealEntries(ids: string[]) {
  return apiFetch("/meal-plans/entries/toggle-bulk", {
    method: "PATCH",
    body: JSON.stringify({ ids }),
  });
}
