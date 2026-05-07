"use client";

import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";
import { NutrientRow } from "./components/NutrientRow";
import { groupByNutrientGroup } from "./utils/groupByNutrientGroup";

const GROUP_LABELS: Record<string, string> = {
  macros: "Макронутрієнти",
  fats: "Жири",
  carbs: "Вуглеводи",
  vitamins: "Вітаміни",
  minerals: "Мінерали",
  other: "Інше",
};

export function RecipeNutrients({ recipe }: { recipe: RecipeDetailsDTO }) {
  const groups = groupByNutrientGroup(recipe.nutrients);

  return (
    <div className="pb-16 mt-4 space-y-6">
      <div className="text-xs text-gray-400">
        Значення наведені на 100 г готової страви
      </div>

      {groups.map((group) => (
        <div key={group.group}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            {GROUP_LABELS[group.group] ?? group.group}
          </h3>

          <div className="bg-white rounded-2xl shadow-sm divide-y">
            {group.items.map((n) => (
              <NutrientRow key={n.code} nutrient={n} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
