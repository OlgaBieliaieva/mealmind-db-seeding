"use client";

import EnergyBattery from "./nutrition/EnergyBattery";
import MacroSnapshot from "./nutrition/MacroSnapshot";

import { AggregatedNutritionSnapshotDTO } from "@/shared/types/meal-plan.types";

type Props = {
  nutrition?: AggregatedNutritionSnapshotDTO;
  compact?: boolean;
};

export function MemberNutritionCard({ nutrition, compact = false }: Props) {
  if (!nutrition) {
    return (
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-sm text-gray-500">
          Nutrition-аналіз стане інформативнішим, коли для користувача буде
          доступна ціль по енергії та макронутрієнтах.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`space-y-3 rounded-2xl border bg-white p-4 shadow-sm ${
        compact ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500">Харчовий баланс</div>
          <div className="text-xl font-semibold text-gray-900">
            {Math.round(nutrition.energyKcal)} ккал
          </div>
        </div>

        {nutrition.energyPercent !== undefined &&
        nutrition.energyStatus !== undefined ? (
          <EnergyBattery
            percent={nutrition.energyPercent}
            status={nutrition.energyStatus}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
        <span className="rounded-full border bg-gray-50 px-2.5 py-1">
          Б {nutrition.protein.toFixed(0)} г
        </span>
        <span className="rounded-full border bg-gray-50 px-2.5 py-1">
          Ж {nutrition.fat.toFixed(0)} г
        </span>
        <span className="rounded-full border bg-gray-50 px-2.5 py-1">
          В {nutrition.carbs.toFixed(0)} г
        </span>
      </div>

      {(!compact || !!nutrition.issues?.length) && (
        <MacroSnapshot
          protein={nutrition.proteinPercent}
          fat={nutrition.fatPercent}
          carbs={nutrition.carbsPercent}
        />
      )}

      {!!nutrition.issues?.length && (
        <div className="space-y-1">
          {nutrition.issues.map((issue) => (
            <div
              key={issue}
              className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {issue}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
