import { MenuEntry } from "@/types/menu-entry";
import { NutrientsMap } from "@/types/nutrients";
import { AggregatedNutrients } from "@/types/nutrition-aggregation";

type Maps = {
  recipeWeightMap: Record<string, number>;
  recipeNutrientsMap: Record<string, NutrientsMap>;
  productNutrientsMap: Record<string, NutrientsMap>;
};

export function aggregateEntriesNutrients(
  entries: MenuEntry[],
  maps: Maps,
): AggregatedNutrients {
  const result: AggregatedNutrients = {};

  for (const entry of entries) {
    let weight = 0;
    let nutrients: NutrientsMap | undefined;

    if (entry.entry_type === "recipe") {
      const weightPerServing = maps.recipeWeightMap[entry.entry_id] ?? 0;

      weight = (entry.servings ?? 0) * weightPerServing;
      nutrients = maps.recipeNutrientsMap[entry.entry_id];
    }

    if (entry.entry_type === "product") {
      weight = entry.quantity ?? 0;
      nutrients = maps.productNutrientsMap[entry.entry_id];
    }

    if (!nutrients || weight <= 0) continue;

    const multiplier = weight / 100;

    for (const [code, data] of Object.entries(nutrients)) {
      if (!result[code]) result[code] = 0;
      result[code] += data.value * multiplier;
    }
  }

  return result;
}
