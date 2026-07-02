import { AggregatedNutritionSnapshotDTO } from "@/shared/types/meal-plan.types";

export function getNutritionStatusLabel(
  nutrition?: AggregatedNutritionSnapshotDTO,
) {
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
      return nutrition.issues?.length
        ? "Потребує уваги"
        : "Оцінка поки неповна";
  }
}

export function getNutritionStatusTone(
  nutrition?: AggregatedNutritionSnapshotDTO,
) {
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

export function getNutritionSignalsSummary(
  nutrition?: AggregatedNutritionSnapshotDTO,
) {
  const count = nutrition?.issues?.length ?? 0;

  if (count === 0) return "Без критичних відхилень";
  if (count === 1) return "1 сигнал";

  return `${count} сигнали`;
}

export function getEnergyTarget(nutrition?: AggregatedNutritionSnapshotDTO) {
  if (!nutrition?.energyPercent) {
    return undefined;
  }

  return nutrition.energyKcal / (nutrition.energyPercent / 100);
}

export function getControlledNutrientsSummary(
  nutrition?: AggregatedNutritionSnapshotDTO,
) {
  const items = nutrition?.controlledNutrients ?? [];

  if (!items.length) {
    return [];
  }

  return items.map((item) => ({
    ...item,
    valueLabel: `${item.actualValue}${item.unit}`,
    targetLabel:
      item.targetValue !== undefined
        ? `${item.targetValue}${item.unit}`
        : undefined,
  }));
}
