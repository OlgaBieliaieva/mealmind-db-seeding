import { RecipeNutrientRow } from "@/shared/domain/nutrition/nutrient-row.types";

type Props = {
  rows: RecipeNutrientRow[];
};

export function RecipeNutrientsTable({ rows }: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[420px] space-y-2">
        {/* HEADER */}
        <div className="grid grid-cols-[1fr_80px_80px_80px] text-xs text-gray-500 text-center">
          <div>Нутрієнт</div>
          <div>Всього</div>
          <div>100г</div>
          <div>Порція</div>
        </div>

        {/* ROWS */}
        {rows.map((n) => (
          <div
            key={n.id}
            className="grid grid-cols-[1fr_80px_80px_80px] text-sm"
          >
            <div className="truncate pr-2" title={n.label}>
              {n.label}
            </div>

            <div className="text-right tabular-nums">{Math.round(n.total)}</div>

            <div className="text-right tabular-nums">
              {n.per100g.toFixed(1)}
            </div>

            <div className="text-right tabular-nums">
              {n.perServing.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
