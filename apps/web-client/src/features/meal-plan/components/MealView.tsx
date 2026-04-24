"use client";

import { useState } from "react";
import { MealSummary } from "./MealSummary";
import { MealTypeTabs } from "./MealTypeTabs";
import { MealItem } from "./MealItem";

import {
  AggregatedMealItemDTO,
  AggregatedSummaryDTO,
} from "@/shared/types/meal-plan.types";

type Props = {
  items: AggregatedMealItemDTO[];
  summary: AggregatedSummaryDTO;
};

export function MealView({ items, summary }: Props) {
  const [activeMealType, setActiveMealType] = useState("all");

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

  return (
    <div className="space-y-4">
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
    </div>
  );
}
