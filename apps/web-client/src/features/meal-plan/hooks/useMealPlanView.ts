"use client";

import { useMealPlan } from "./useMealPlan";
import { usePlanParams } from "./usePlanParams";
import { AggregatedMealItemDTO } from "@/shared/types/meal-plan.types";

export function useMealPlanView() {
  const { data, isLoading } = useMealPlan();
  const { selectedDays, viewMode } = usePlanParams();

  if (!data) {
    return {
      isLoading: true,
      isEmpty: true,
      aggregated: {
        tabs: [{ id: "all", name: "Всі", orderIndex: -1 }],
        views: {
          all: {
            summary: {
              totalItems: 0,
              preparedItems: 0,
              progress: 0,
            },
            items: [],
          },
          byMealType: [],
        },
      },
      weekDays: [],
    };
  }

  // =========================
  // MEAL VIEW (NEW)
  // =========================

  // const aggregatedMeals: AggregatedMealItemDTO[] = data.aggregated.items;

  // =========================
  // USER VIEW (OLD)
  // =========================

  const weekDays = data.week.days.filter((d) => selectedDays.includes(d.date));

  // =========================
  // EMPTY STATE
  // =========================

  const isEmpty =
    viewMode === "meal"
      ? data.aggregated.views.all.items.length === 0
      : weekDays.length === 0;

  return {
    isLoading,
    isEmpty,
    aggregated: data.aggregated,
    weekDays,
    // data
    // summary: data.aggregated.summary,
  };
}
