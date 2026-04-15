import { RecipeNutrientRow } from "@/shared/domain/nutrition/nutrient-row.types";

type Props = {
  rows: RecipeNutrientRow[];
};

export function RecipeNutrientsTable({ rows }: Props) {
  return (
    <div className="space-y-2">
      {/* HEADER */}
      <div className="grid grid-cols-[1fr_80px_80px_80px] text-xs text-gray-500">
        <div>Нутрієнт</div>
        <div>Всього</div>
        <div>100г</div>
        <div>Порція</div>
      </div>

      {/* ROWS */}
      {rows.map((n) => (
        <div key={n.id} className="grid grid-cols-[1fr_80px_80px_80px] text-sm">
          <div>{n.label}</div>

          <div>{Math.round(n.total)}</div>

          <div>{n.per100g.toFixed(1)}</div>

          <div>{n.perServing.toFixed(1)}</div>
        </div>
      ))}
    </div>
  );
}
