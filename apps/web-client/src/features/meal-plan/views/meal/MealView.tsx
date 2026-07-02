"use client";

import { useState } from "react";

import { MealSummary } from "@/features/meal-plan/views/meal/MealSummary";
import { MealTypeTabs } from "@/features/meal-plan/views/meal/MealTypeTabs";
import { MealItem } from "@/features/meal-plan/views/meal/MealItem";

import {
  getMealActiveView,
  getMealTabs,
} from "./presenters/meal-view.presenter";
import { AggregatedMealViewDTO } from "@/shared/types/meal-plan.types";
import { PlanFloatingActionButton } from "@/features/meal-plan/shared/components/PlanFloatingActionButton";
import { useMealPlanActions } from "@/features/meal-plan/hooks/useMealPlanActions";

type Props = {
  aggregated: AggregatedMealViewDTO;
};

export function MealView({ aggregated }: Props) {
  const [activeMealType, setActiveMealType] = useState("all");
  const actions = useMealPlanActions();

  const activeView = getMealActiveView(aggregated, activeMealType);

  const items = activeView?.items ?? [];
  const summary = activeView?.summary ?? {
    totalItems: 0,
    preparedItems: 0,
    progress: 0,
  };

  const mealTypes = getMealTabs(aggregated);

  const handleAdd = () => {
    actions.openCreate({ mealTypeId: activeMealType });    
  };

  return (
    <div className="space-y-4 pb-20">
      <MealSummary
        total={summary.totalItems}
        prepared={summary.preparedItems}
      />

      <MealTypeTabs
        mealTypes={mealTypes}
        active={activeMealType}
        onChange={setActiveMealType}
      />

      <div className="space-y-3">
        {items.map((item) => (
          <MealItem
            key={`${item.type}-${item.id}-${activeMealType}`}
            item={item}
          />
        ))}
      </div>

      <div className="absolute right-5 bottom-24 z-50">
        <PlanFloatingActionButton onClick={handleAdd} />
        {/* <button
          onClick={handleAdd}
          className="
            w-14 h-14
            rounded-full
            bg-green-600
            text-white
            flex items-center justify-center
            shadow-lg
            active:scale-95
            transition
          "
        >
          <Plus />
        </button> */}
      </div>
    </div>
  );
}

