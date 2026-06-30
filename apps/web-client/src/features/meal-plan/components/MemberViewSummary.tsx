"use client";

import EnergyBattery from "./nutrition/EnergyBattery";
import MacroSnapshot from "./nutrition/MacroSnapshot";

import {
  AggregatedMemberGroupDTO,
  AggregatedNutritionSnapshotDTO,
  AggregatedSummaryDTO,
} from "@/shared/types/meal-plan.types";

type Props =
  | {
      mode: "all";
      members: AggregatedMemberGroupDTO[];
      summary: AggregatedSummaryDTO;
    }
  | {
      mode: "single";
      memberName: string;
      summary: AggregatedSummaryDTO;
      nutrition?: AggregatedNutritionSnapshotDTO;
      mealTypesCount: number;
    };

function getEnergyStatus(percent: number): "balanced" | "warning" | "critical" {
  if (percent >= 90 && percent <= 110) {
    return "balanced";
  }

  if (percent >= 75 && percent <= 120) {
    return "warning";
  }

  return "critical";
}

export function MemberViewSummary(props: Props) {
  if (props.mode === "all") {
    const totalMembers = props.members.length;
    const withPlannedMeals = props.members.filter(
      (member) => member.summary.totalItems > 0,
    ).length;
    const membersWithIssues = props.members.filter(
      (member) => (member.nutrition?.issues?.length ?? 0) > 0,
    ).length;
    const balancedMembers = props.members.filter(
      (member) => member.nutrition?.energyStatus === "balanced",
    ).length;
    const nutritionMembers = props.members.filter((member) => member.nutrition);
    const avgEnergyPercent =
      nutritionMembers.length > 0
        ? nutritionMembers.reduce(
            (sum, member) => sum + (member.nutrition?.energyPercent ?? 0),
            0,
          ) / nutritionMembers.length
        : undefined;

    return (
      <div className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Аналіз по членах родини</div>
            <div className="text-lg font-semibold text-gray-900">
              Порівняння індивідуального балансу та покриття плану
            </div>
            <div className="text-sm text-gray-500">
              Тут важливо не лише що заплановано, а наскільки план відповідає
              потребам кожної людини окремо.
            </div>
          </div>

          {avgEnergyPercent !== undefined ? (
            <div className="w-full md:w-60">
              <EnergyBattery
                percent={avgEnergyPercent}
                status={getEnergyStatus(avgEnergyPercent)}
                label="Середнє енерго-покриття"
              />
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-gray-50 p-3">
            <div className="text-xs text-gray-500">Членів родини</div>
            <div className="text-lg font-semibold text-gray-900">
              {totalMembers}
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <div className="text-xs text-gray-500">Мають план</div>
            <div className="text-lg font-semibold text-gray-900">
              {withPlannedMeals}
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 p-3">
            <div className="text-xs text-amber-700">Потребують уваги</div>
            <div className="text-lg font-semibold text-gray-900">
              {membersWithIssues}
            </div>
          </div>

          <div className="rounded-xl bg-green-50 p-3">
            <div className="text-xs text-green-700">У межах балансу</div>
            <div className="text-lg font-semibold text-gray-900">
              {balancedMembers}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
          Заплановано позицій: {props.summary.totalItems}. Готовність лишається
          допоміжним контекстом, а головний фокус цього режиму - якість і
          повнота плану для кожного члена родини.
        </div>
      </div>
    );
  }

  const { memberName, summary, nutrition, mealTypesCount } = props;
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
