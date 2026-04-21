"use client";

import { useQuery } from "@tanstack/react-query";
import { usePlanParams } from "./usePlanParams";
import { getMealPlan } from "@/shared/api/meal-plan/meal-plan.api";

export function useMealPlan() {
  const { activeDate, selectedDays } = usePlanParams();

  return useQuery({
    queryKey: ["meal-plan", activeDate, selectedDays],
    queryFn: () =>
      getMealPlan({
        date: activeDate,
        days: selectedDays.length > 1 ? selectedDays : undefined,
      }),
  });
}
