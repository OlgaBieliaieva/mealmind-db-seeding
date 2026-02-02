"use client";

import { NutrientsMap } from "@/types/nutrients";
import { useNutrientsReference } from "@/lib/hooks/useNutrientsReference";

type Props = {
  servings: number;
  outputWeight: number;
  nutrients: NutrientsMap;
};

export function RecipePreview({ servings, outputWeight, nutrients }: Props) {
  const { items: nutrientRefs, loading } = useNutrientsReference();

  if (loading) {
    return (
      <div className="rounded border bg-gray-50 p-4 text-sm text-gray-500">
        Завантаження поживної цінності…
      </div>
    );
  }

  const macroRefs = nutrientRefs
    .filter((n) => n.nutrient_group === "macro")
    .sort((a, b) => a.sort_order - b.sort_order);

  const portionWeight = servings > 0 ? Math.round(outputWeight / servings) : 0;

  return (
    <div className="rounded border bg-gray-50 p-4 space-y-4">
      <h2 className="font-medium">Попередній перегляд рецепта</h2>

      {/* Portions */}
      <div className="text-sm space-y-1">
        <div>Порцій: {servings}</div>
        <div>Загальний вихід: {outputWeight} г</div>
        <div>Вага 1 порції: {portionWeight} г</div>
      </div>

      {/* Nutrition */}
      <div>
        <h3 className="text-sm font-medium mb-2">
          Поживна цінність (на 1 порцію)
        </h3>

        <ul className="text-sm space-y-1">
          {macroRefs.map((ref) => {
            const total = nutrients[ref.nutrient_id]?.value ?? 0;
            const perPortion = servings > 0 ? total / servings : 0;

            return (
              <li key={ref.nutrient_id} className="flex justify-between">
                <span>{ref.name.ua}</span>
                <span>
                  {perPortion.toFixed(1)} {ref.default_unit}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
