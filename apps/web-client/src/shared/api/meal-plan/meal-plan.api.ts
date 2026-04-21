import { apiFetch } from "@/shared/lib/api/fetcher";

export function getMealPlan(params: { date: string; days?: string[] }) {
  const qs = new URLSearchParams();

  qs.set("date", params.date);

  if (params.days?.length) {
    qs.set("days", params.days.join(","));
  }

  return apiFetch(`/meal-plans?${qs.toString()}`);
}
