"use client";

import { useMealPlanView } from "../hooks/useMealPlanView";
import { usePlanParams } from "../hooks/usePlanParams";
import { MealView } from "./MealView";

export default function PlanContent() {
  const { aggregatedMeals, summary, isLoading } = useMealPlanView();
  const { viewMode } = usePlanParams();

  if (isLoading) return <div className="p-4">Завантаження...</div>;

  return (
    <div className="pt-4">
      {viewMode === "meal" && (
        <MealView items={aggregatedMeals} summary={summary} />
      )}
    </div>
  );
}
