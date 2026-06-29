"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { MealSummary } from "./MealSummary";
import { MealTypeTabs } from "./MealTypeTabs";
import { MealItem } from "./MealItem";

// import { usePlanParams } from "../hooks/usePlanParams";
import { useAddToPlanNavigation } from "../hooks/useAddToPlanNavigation";

import { AggregatedMealPlanDTO } from "@/shared/types/meal-plan.types";

type Props = {
  aggregated: AggregatedMealPlanDTO;
};

export function MealView({ aggregated }: Props) {
  const [activeMealType, setActiveMealType] = useState("all");
  const navigateToAdd = useAddToPlanNavigation();

  const { tabs, views } = aggregated;

  const activeView =
    activeMealType === "all"
      ? views.all
      : views.byMealType.find((group) => group.mealType.id === activeMealType);

  const items = activeView?.items ?? [];
  const summary = activeView?.summary ?? {
    totalItems: 0,
    preparedItems: 0,
    progress: 0,
  };

  const mealTypes = tabs.map((tab) => ({
    id: tab.id,
    name: tab.name,
  }));

  const handleAdd = () => {
    navigateToAdd(activeMealType);
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

      <ul className="space-y-3">
        {items.map((item) => (
          <MealItem
            key={`${item.type}-${item.id}-${activeMealType}`}
            item={item}
          />
        ))}
      </ul>

      {/* 👉 FLOATING ADD BUTTON */}
      <div className="absolute right-5 bottom-24 z-50">
        <button
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
        </button>
      </div>
    </div>
  );
}
