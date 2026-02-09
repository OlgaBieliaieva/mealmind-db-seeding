"use client";

import { NutrientsMap } from "@/types/nutrients";
import { NutrientReference } from "@/types/nutrient.dto";

type Props = {
  servings: number;
  outputWeight: number;
  nutrients: NutrientsMap;
  nutrientRefs: NutrientReference[];
};

export function RecipePreview({
  servings,
  outputWeight,
  nutrients,
  nutrientRefs,
}: Props) {
  if (!nutrientRefs.length || outputWeight <= 0) return null;

  const portionWeight = servings > 0 ? outputWeight / servings : outputWeight;

  return (
    <div className="rounded border bg-gray-50 p-4 space-y-3">
      <h3 className="font-medium">Поживна цінність</h3>

      <div className="text-sm text-gray-600">
        Вихід страви: {outputWeight} г · {servings} порц.
        <br />
        Вага порції: {portionWeight.toFixed(0)} г
      </div>

      <table className="w-full text-sm">
        <tbody>
          {nutrientRefs.map((n) => {
            const total = nutrients[n.nutrient_id]?.value ?? 0;

            const per100g = outputWeight > 0 ? (total / outputWeight) * 100 : 0;

            const perPortion = (per100g * portionWeight) / 100;

            return (
              <tr key={n.nutrient_id}>
                <td>{n.name.ua}</td>

                <td className="text-right">
                  {per100g.toFixed(1)} {n.default_unit} / 100 г
                </td>

                <td className="text-right text-gray-500">
                  {perPortion.toFixed(1)} {n.default_unit} / порц.
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
