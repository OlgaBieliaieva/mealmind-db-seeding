"use client";

import { useMealPlan } from "./useMealPlan";
import { usePlanParams } from "./usePlanParams";

export function useMealPlanView() {
  const { data, isLoading } = useMealPlan();
  const { selectedDays, viewMode } = usePlanParams();

  if (!data) {
    return {
      isLoading: true,
      isEmpty: true,
      aggregated: {
        views: {
          meal: {
            tabs: [{ id: "all", name: "Всі", orderIndex: -1 }],
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
          member: {
            summary: {
              totalItems: 0,
              preparedItems: 0,
              progress: 0,
            },
            members: [],
          },
        },
      },
      weekDays: [],
    };
  }

  const weekDays = data.week.days.filter((d) => selectedDays.includes(d.date));

  const isEmpty =
    viewMode === "meal"
      ? data.aggregated.views.meal.all.items.length === 0
      : data.aggregated.views.member.members.length === 0;

  return {
    isLoading,
    isEmpty,
    aggregated: data.aggregated,
    weekDays,
  };
}
