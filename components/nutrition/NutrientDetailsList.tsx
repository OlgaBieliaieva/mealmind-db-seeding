"use client";

import { NutritionDisplayItem } from "@/lib/v1/nutrition/nutrition.adapter";
import NutrientProgressRow from "./NutrientProgressRow";

type Props = {
  nutrition: NutritionDisplayItem[];
  targets: Record<string, number>;
  highlighted: string[];
  periodDays: number;
};

export default function NutrientDetailsList({
  nutrition,
  targets,
  highlighted,
  periodDays,
}: Props) {
  return (
    <div className="space-y-2">
      {nutrition.map((item) => (
        <NutrientProgressRow
          key={item.code}
          item={item}
          target={targets[item.code]}
          periodDays={periodDays}
          isHighlighted={highlighted.includes(item.code)}
        />
      ))}
    </div>
  );
}
