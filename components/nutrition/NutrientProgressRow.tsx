"use client";

import { NutritionDisplayItem } from "@/lib/v1/nutrition/nutrition.adapter";

type Props = {
  item: NutritionDisplayItem;
  target?: number;
  periodDays: number;
  isHighlighted: boolean;
};

export default function NutrientProgressRow({
  item,
  target,
  periodDays,
  isHighlighted,
}: Props) {
  const perDayValue = item.value / periodDays;

  const percent =
    target && target > 0 ? (item.value / (target * periodDays)) * 100 : null;

  return (
    <div className={`p-2 rounded-md ${isHighlighted ? "bg-red-50" : ""}`}>
      <div className="flex justify-between text-sm">
        <span>{item.name}</span>
        <span>
          {perDayValue.toFixed(1)} {item.unit}
        </span>
      </div>

      {percent !== null && (
        <div className="mt-1 h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-blue-500 rounded transition-all"
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
