"use client";

import { useMealPlanView } from "../hooks/useMealPlanView";
import { usePlanParams } from "../hooks/usePlanParams";
import { EmptyMealPlan } from "./EmptyMealPlan";
import { MealView } from "./MealView";
import { MemberView } from "./MemberView";

export default function PlanContent() {
  const { aggregated, isLoading, isEmpty } = useMealPlanView();
  const { viewMode } = usePlanParams();

  if (isLoading) return <div className="p-4">Завантаження...</div>;

  if (isEmpty) {
    return (
      <div className="pt-4">
        <EmptyMealPlan />
      </div>
    );
  }

  return (
    <div className="pt-4">
      {viewMode === "meal" ? (
        <MealView aggregated={aggregated.views.meal} />
      ) : (
        <MemberView aggregated={aggregated.views.member} />
      )}
    </div>
  );
}
