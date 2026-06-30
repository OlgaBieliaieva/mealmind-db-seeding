"use client";

import { MealItem } from "./MealItem";
import EnergyBattery from "./nutrition/EnergyBattery";
import MacroSnapshot from "./nutrition/MacroSnapshot";

import { AggregatedMemberMealTypeGroupDTO } from "@/shared/types/meal-plan.types";

type Props = {
  group: AggregatedMemberMealTypeGroupDTO;
  memberId: string;
};

export function MemberMealTypeSection({ group, memberId }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex items-start justify-between gap-4 border-b bg-green-50 px-3 py-3">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-wide text-green-700">
            Прийом їжі
          </div>
          <div className="text-sm font-medium text-gray-900">
            {group.mealType.name}
          </div>

          <div className="text-xs text-gray-500">
            {group.summary.totalItems} позицій • {group.summary.preparedItems}/
            {group.summary.totalItems} готово
          </div>
        </div>

        <div className="shrink-0 space-y-2 text-right">
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

          {group.nutrition?.energyPercent !== undefined &&
          group.nutrition.energyStatus !== undefined ? (
            <div className="w-28">
              <EnergyBattery
                percent={group.nutrition.energyPercent}
                status={group.nutrition.energyStatus}
                label="Енергія"
              />
            </div>
          ) : null}
        </div>
      </div>

      {group.nutrition ? (
        <div className="space-y-3 px-3 pt-3">
          <MacroSnapshot
            protein={group.nutrition.proteinPercent}
            fat={group.nutrition.fatPercent}
            carbs={group.nutrition.carbsPercent}
          />

          {!!group.nutrition.issues?.length && (
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
      ) : null}

      <div className="space-y-3 p-3">
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
