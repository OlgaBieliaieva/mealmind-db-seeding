"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { MealSummary } from "./MealSummary";
import { MealTypeTabs } from "./MealTypeTabs";
import { MealItem } from "./MealItem";

import { usePlanParams } from "../hooks/usePlanParams";
import { useAddToPlanNavigation } from "../hooks/useAddToPlanNavigation";

import {
  AggregatedMealItemDTO,
  AggregatedSummaryDTO,
} from "@/shared/types/meal-plan.types";

type Props = {
  items: AggregatedMealItemDTO[];
  summary: AggregatedSummaryDTO;
};

export function MealView({ items, summary }: Props) {
  const router = useRouter();
  const { activeDate } = usePlanParams();

  const [activeMealType, setActiveMealType] = useState("all");
  const navigateToAdd = useAddToPlanNavigation();

  const mealTypes = [
    { id: "all", name: "Всі" },
    ...Array.from(
      new Map(items.map((i) => [i.mealTypeId, i.mealTypeName])),
    ).map(([id, name]) => ({ id, name })),
  ];

  const filtered =
    activeMealType === "all"
      ? items
      : items.filter((i) => i.mealTypeId === activeMealType);

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

      <div className="space-y-3">
        {filtered.map((item) => (
          <MealItem key={item.id} item={item} />
        ))}
      </div>

      {/* 👉 FLOATING ADD BUTTON */}
      <div className="fixed right-5 bottom-24 z-50">
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
