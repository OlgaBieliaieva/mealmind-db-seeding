"use client";

import { MealItem } from "./MealItem";
import { AggregatedMemberMealTypeGroupDTO } from "@/shared/types/meal-plan.types";

type Props = {
  group: AggregatedMemberMealTypeGroupDTO;
  memberId: string;
};

export function MemberMealTypeSection({ group, memberId }: Props) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-green-50 border-b">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {group.mealType.name}
          </div>

          <div className="text-xs text-gray-500">
            {group.summary.preparedItems}/{group.summary.totalItems} готово
          </div>
        </div>

        {group.nutrition && (
          <div className="text-right text-xs text-gray-600">
            <div>{Math.round(group.nutrition.energyKcal)} ккал</div>
            <div>
              Б {group.nutrition.protein.toFixed(0)} · Ж{" "}
              {group.nutrition.fat.toFixed(0)} · В{" "}
              {group.nutrition.carbs.toFixed(0)}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 space-y-3">
        {group.items.length === 0 ? (
          <div className="text-sm text-gray-400">Немає страв</div>
        ) : (
          group.items.map((item) => (
            <MealItem
              key={`${memberId}-${group.mealType.id}-${item.type}-${item.id}`}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}
