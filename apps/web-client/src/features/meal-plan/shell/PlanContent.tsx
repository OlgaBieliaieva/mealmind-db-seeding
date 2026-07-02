"use client";

import { useMealPlanView } from "@/features/meal-plan/hooks/useMealPlanView";
import { usePlanParams } from "@/features/meal-plan/hooks/usePlanParams";
import { EmptyMealPlan } from "@/features/meal-plan/shell/EmptyMealPlan";
import { MealView } from "@/features/meal-plan/views/meal/MealView";
import { MemberView } from "@/features/meal-plan/views/member/MemberView";

export default function PlanContent() {
  const { aggregated, isLoading, isEmpty } = useMealPlanView();
  const { viewMode } = usePlanParams();

  if (isLoading) {
    return <div className="p-4">Завантаження...</div>;
  }

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
