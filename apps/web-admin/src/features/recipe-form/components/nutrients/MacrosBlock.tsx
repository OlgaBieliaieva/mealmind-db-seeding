import { RecipeNutrientRow } from "@/shared/domain/nutrition/nutrient-row.types";

type Props = {
  rows: RecipeNutrientRow[];
};

export function RecipeMacrosBlock({ rows }: Props) {
  function find(code: string) {
    return rows.find((r) => r.code === code);
  }

  const macros = [
    { label: "Калорії", code: "energy_kcal" },
    { label: "Білки", code: "protein" },
    { label: "Жири", code: "fat" },
    { label: "Вуглеводи", code: "carbohydrates" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {macros.map((m) => {
        const n = find(m.code);

        return (
          <div key={m.code} className="border rounded p-3">
            <div className="text-xs text-gray-500">{m.label}</div>

            <div className="text-sm">
              <b>{n ? n.total.toFixed(1) : "0.0"}</b> {n?.unit ?? ""}
            </div>

            <div className="text-xs text-gray-500">
              100г: {n ? n.per100g.toFixed(1) : "0.0"}
            </div>

            <div className="text-xs text-gray-500">
              порція: {n ? n.perServing.toFixed(1) : "0.0"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
