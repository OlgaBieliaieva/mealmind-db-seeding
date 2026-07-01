"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { AggregatedNutritionSnapshotDTO } from "@/shared/types/meal-plan.types";

import { InfoTooltip } from "./InfoTooltip";
import EnergyBattery from "./nutrition/EnergyBattery";

type Props = {
  nutrition?: AggregatedNutritionSnapshotDTO;
  selectedDays: string[];
};

function formatDateLabel(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const safeDate = new Date(Date.UTC(year, month - 1, day));

  return safeDate.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
  });
}

function getPeriodLabel(selectedDays: string[]) {
  if (selectedDays.length === 1) {
    return `За ${formatDateLabel(selectedDays[0])}`;
  }

  return `За ${selectedDays.length} днів`;
}

function getEnergyTarget(nutrition?: AggregatedNutritionSnapshotDTO) {
  if (!nutrition?.energyPercent) {
    return undefined;
  }

  return nutrition.energyKcal / (nutrition.energyPercent / 100);
}

function getStatusLabel(nutrition?: AggregatedNutritionSnapshotDTO) {
  if (!nutrition) {
    return "Оцінка поки неповна";
  }

  switch (nutrition.energyStatus) {
    case "balanced":
      return "У межах балансу";
    case "warning":
      return "Потребує уваги";
    case "critical":
      return "Є суттєві відхилення";
    default:
      return nutrition.issues?.length ? "Потребує уваги" : "Оцінка поки неповна";
  }
}

function getStatusTone(nutrition?: AggregatedNutritionSnapshotDTO) {
  switch (nutrition?.energyStatus) {
    case "balanced":
      return "text-green-700 bg-green-50 border-green-200";
    case "warning":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "critical":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-slate-600 bg-slate-100 border-slate-200";
  }
}

function getSignalsSummary(nutrition?: AggregatedNutritionSnapshotDTO) {
  const count = nutrition?.issues?.length ?? 0;

  if (count === 0) {
    return "Без критичних відхилень";
  }

  if (count === 1) {
    return "1 сигнал";
  }

  return `${count} сигнали`;
}

export function MemberNutritionOverview({
  nutrition,
  selectedDays,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const periodLabel = getPeriodLabel(selectedDays);
  const targetEnergyKcal = getEnergyTarget(nutrition);
  const statusLabel = getStatusLabel(nutrition);
  const statusTone = getStatusTone(nutrition);
  const signalsSummary = getSignalsSummary(nutrition);

  if (!nutrition) {
    return (
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Загальна оцінка
            </div>
            <div className="text-sm font-medium text-slate-900">{periodLabel}</div>
          </div>

          <InfoTooltip
            title="Загальна оцінка"
            description="Тут зібрано короткий висновок по енергії, макронутрієнтах та ключових сигналах для обраного періоду."
            align="right"
            side="bottom"
          />
        </div>

        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-500">
          Аналіз стане повнішим, коли для користувача будуть доступні базові
          параметри та цілі по енергії або макронутрієнтах.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Загальна оцінка
            </div>
            <div className="text-sm font-medium text-slate-900">{periodLabel}</div>
          </div>

          <div className="flex items-center gap-2">
            <InfoTooltip
              title="Загальна оцінка"
              description="Короткий висновок по енергії, макронутрієнтах та сигналах для обраного періоду. Деталі можна розгорнути нижче."
              align="right"
              side="bottom"
            />

            <button
              type="button"
              onClick={() => setIsExpanded((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {isExpanded ? "Згорнути" : "Деталі"}
              <ChevronDown
                size={14}
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusTone}`}>
            {statusLabel}
          </span>
          <span className="text-sm text-slate-700">
            {Math.round(nutrition.energyKcal)} з{" "}
            {targetEnergyKcal ? Math.round(targetEnergyKcal) : "—"} ккал
          </span>
        </div>

        {nutrition.energyPercent !== undefined &&
        nutrition.energyStatus !== undefined ? (
          <EnergyBattery
            percent={nutrition.energyPercent}
            status={nutrition.energyStatus}
            label="Покриття енергії"
          />
        ) : null}

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="flex flex-wrap gap-2 text-sm text-slate-700">
            <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5">
              Б {nutrition.proteinPercent.toFixed(0)}%
            </span>
            <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5">
              Ж {nutrition.fatPercent.toFixed(0)}%
            </span>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
              В {nutrition.carbsPercent.toFixed(0)}%
            </span>
          </div>

          <div className="text-sm text-slate-600">{signalsSummary}</div>
        </div>

        {!!nutrition.issues?.length && (
          <div className="flex flex-wrap gap-2">
            {nutrition.issues.map((issue) => (
              <span
                key={issue}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-800"
              >
                {issue}
              </span>
            ))}
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
          <div className="space-y-3 rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium text-slate-900">
                Деталізація макронутрієнтів
              </div>

              <InfoTooltip
                title="Деталізація макронутрієнтів"
                description="Тут наведені фактичні значення макронутрієнтів у грамах для обраного періоду. Контрольовані нутрієнти можна буде додати сюди окремим блоком, коли вони з’являться в response."
                align="right"
                side="bottom"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-slate-700">
              <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5">
                Білки: {nutrition.protein.toFixed(0)} г
              </span>
              <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5">
                Жири: {nutrition.fat.toFixed(0)} г
              </span>
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
                Вуглеводи: {nutrition.carbs.toFixed(0)} г
              </span>
            </div>

            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
              Контрольовані нутрієнти, такі як сіль, цукор чи клітковина, тут
              можна буде показати окремо після розширення даних з бекенду.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
