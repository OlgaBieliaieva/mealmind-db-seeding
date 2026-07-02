"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { AggregatedMemberMealTypeGroupDTO } from "@/shared/types/meal-plan.types";

import { MemberNutritionItemCard } from "./MemberNutritionItemCard";
import EnergyBattery from "./nutrition/EnergyBattery";

type Props = {
  group: AggregatedMemberMealTypeGroupDTO;
  memberId: string;
};

export function MemberMealTypeSection({ group, memberId }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="overflow-hidden rounded-xl border">
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="block w-full text-left transition hover:bg-green-50/70"
      >
        <div className="space-y-3 border-b bg-green-50 px-3 py-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-gray-900">
                  {group.mealType.name}
                </div>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-gray-400 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div className="text-xs text-gray-500">
                {group.summary.totalItems} позицій •{" "}
                {group.summary.preparedItems}/{group.summary.totalItems} готово
              </div>
            </div>

            <div className="shrink-0 text-right">
              {group.nutrition ? (
                <div className="text-xs text-gray-600">
                  <div>{Math.round(group.nutrition.energyKcal)} ккал</div>
                  <div className="mt-1">
                    Б {group.nutrition.protein.toFixed(0)} • Ж{" "}
                    {group.nutrition.fat.toFixed(0)} • В{" "}
                    {group.nutrition.carbs.toFixed(0)}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {group.nutrition?.energyPercent !== undefined &&
          group.nutrition.energyStatus !== undefined ? (
            <EnergyBattery
              percent={group.nutrition.energyPercent}
              status={group.nutrition.energyStatus}
              label="Енергія"
            />
          ) : null}

          {!!group.nutrition?.issues?.length && (
            <div className="flex flex-wrap gap-2">
              {group.nutrition.issues.map((issue) => (
                <span
                  key={issue}
                  className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800"
                >
                  {issue}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-3 p-3">
          {group.items.length === 0 ? (
            <div className="text-sm text-gray-400">Немає страв</div>
          ) : (
            group.items.map((item) => (
              <MemberNutritionItemCard
                key={`${memberId}-${group.mealType.id}-${item.type}-${item.id}`}
                item={item}
                memberId={memberId}
                mealTypeId={group.mealType.id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
