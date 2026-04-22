"use client";

import { useMealPlanView } from "../hooks/useMealPlanView";
import { useMealPlanViewMode } from "../hooks/useMealPlanViewMode";
import { ViewModeSwitch } from "./ViewModeSwitch";
import { groupMeals } from "@/shared/lib/groupMeals";
import { groupByUser } from "@/shared/lib/groupByUser";
import { MealSection } from "./MealSection";
import { UserSection } from "./UserSection";

export default function PlanContent() {
  const { days, aggregatedMeals, isLoading, isEmpty } = useMealPlanView();

  const { viewMode, setViewMode } = useMealPlanViewMode();

  if (isLoading) {
    return <div className="p-4 text-sm text-gray-400">Loading...</div>;
  }

  return (
    <div>
      <ViewModeSwitch value={viewMode} onChange={setViewMode} />

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
