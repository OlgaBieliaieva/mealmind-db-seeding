"use client";

import { useMealPlan } from "./useMealPlan";
import { usePlanParams } from "./usePlanParams";
import { MealDTO, DayDTO } from "@/shared/types/meal-plan.types";
import { groupMeals } from "@/shared/lib/groupMeals";

export function useMealPlanView() {
  const { data, isLoading } = useMealPlan();
  const { selectedDays, isMulti } = usePlanParams();
  console.log(data);

  if (!data) {
    return {
      isLoading,
      days: [] as DayDTO[],
      aggregatedMeals: [] as MealDTO[],
      isMulti,
      isEmpty: true,
    };
  }

  const visibleDays: DayDTO[] = data.days.filter((d) =>
    selectedDays.includes(d.date),
  );

  const aggregatedMeals: MealDTO[] = groupMeals(
    visibleDays.flatMap((d) => d.meals),
  );

  const isEmpty =
    visibleDays.length === 0 || visibleDays.every((d) => d.meals.length === 0);

  return {
    isLoading,
    days: visibleDays,
    aggregatedMeals,
    isMulti,
    isEmpty,
  };
}
