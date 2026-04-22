"use client";

import { useMealPlanView } from "../hooks/useMealPlanView";
import { usePlanParams } from "../hooks/usePlanParams";
import { groupMeals } from "@/shared/lib/groupMeals";
import { groupByUser } from "@/shared/lib/groupByUser";
import { MealSection } from "./MealSection";
import { UserSection } from "./UserSection";

export default function PlanContent() {
  const { aggregatedMeals, isLoading, isEmpty } = useMealPlanView();
  const { viewMode } = usePlanParams();

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-400">Завантажується...</div>;
  }

  return (
    <div>
      {isEmpty && (
        <div className="p-4 text-sm text-gray-400">
          Немає запланованих прийомів їжі
        </div>
      )}

      {!isEmpty && (
        <div className="p-4 space-y-6">
          {viewMode === "meal" &&
            groupMeals(aggregatedMeals).map((meal) => (
              <MealSection key={meal.mealTypeId} meal={meal} />
            ))}

          {viewMode === "user" &&
            groupByUser(aggregatedMeals).map((user) => (
              <UserSection
                key={user.userId}
                userId={user.userId}
                meals={user.meals}
              />
            ))}
        </div>
      )}
    </div>
  );
}
