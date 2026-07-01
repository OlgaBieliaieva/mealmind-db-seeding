"use client";

import {
  AggregatedNutritionSnapshotDTO,
  AggregatedSummaryDTO,
} from "@/shared/types/meal-plan.types";

import EnergyBattery from "./nutrition/EnergyBattery";
import MacroSnapshot from "./nutrition/MacroSnapshot";

type Props = {
  memberName: string;
  summary: AggregatedSummaryDTO;
  nutrition?: AggregatedNutritionSnapshotDTO;
  mealTypesCount: number;
};

export function MemberViewSummary({
  memberName,
  summary,
  nutrition,
  mealTypesCount,
}: Props) {
  const progress =
    summary.totalItems === 0 ? 0 : summary.preparedItems / summary.totalItems;

  return (
    <div className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Аналіз для</div>
          <div className="font-semibold text-gray-900">{memberName}</div>
          <div className="text-sm text-gray-500">
            Прийомів їжі з планом: {mealTypesCount}
          </div>
        </div>

        {nutrition?.energyPercent !== undefined &&
        nutrition.energyStatus !== undefined ? (
          <div className="w-full md:w-60">
            <EnergyBattery
              percent={nutrition.energyPercent}
              status={nutrition.energyStatus}
              label="Покриття енергії"
            />
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Позицій у плані</div>
          <div className="text-lg font-semibold text-gray-900">
            {summary.totalItems}
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Готово</div>
          <div className="text-lg font-semibold text-gray-900">
            {summary.preparedItems}
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Ккал у плані</div>
          <div className="text-lg font-semibold text-gray-900">
            {nutrition ? Math.round(nutrition.energyKcal) : "—"}
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Готовність позицій</div>
          <div className="text-lg font-semibold text-gray-900">
            {Math.round(progress * 100)}%
          </div>
        </div>
      </div>

      {nutrition ? (
        <MacroSnapshot
          protein={nutrition.proteinPercent}
          fat={nutrition.fatPercent}
          carbs={nutrition.carbsPercent}
        />
      ) : null}

      {!!nutrition?.issues?.length && (
        <div className="flex flex-wrap gap-2">
          {nutrition.issues.map((issue) => (
            <span
              key={issue}
              className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-700"
            >
              {issue}
            </span>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
        Готовність страв показана як допоміжний індикатор. Основний сенс цього
        режиму - зрозуміти, наскільки план відповідає індивідуальним потребам.
      </div>
    </div>
  );
}
