import { MenuEntry } from "@/types/menu-entry";
import { NutrientsMap } from "@/domains/nutrition/types/nutrient-value.types";
import { AggregatedNutrients } from "@/types/nutrition-aggregation";

type Maps = {
  recipeWeightMap: Record<string, number>; // base_output_weight_g
  recipeNutrientsMap: Record<string, NutrientsMap>; // cached totals
  productNutrientsMap: Record<string, NutrientsMap>;
};

/**
 * 🔥 Агрегація списку entries (план, meal, member)
 */
export function aggregateEntriesNutrients(
  entries: MenuEntry[],
  maps: Maps,
): AggregatedNutrients {
  const result: AggregatedNutrients = {};

  for (const entry of entries) {
    const single = aggregateSingleEntryNutrients(entry, maps);

    for (const [code, value] of Object.entries(single)) {
      result[code] = (result[code] ?? 0) + value;
    }
  }

  return result;
}

/**
 * 🔥 Агрегація одного entry
 */
export function aggregateSingleEntryNutrients(
  entry: MenuEntry,
  maps: Maps,
): AggregatedNutrients {
  const result: AggregatedNutrients = {};

  // =========================
  // 🥗 RECIPE
  // =========================
  if (entry.entry_type === "recipe") {
    const baseWeight = Number(maps.recipeWeightMap[entry.entry_id]) || 0;

    const plannedWeight = Number(entry.planned_weight_g) || 0;

    if (!baseWeight || !plannedWeight) {
      return result;
    }

    const nutrients = maps.recipeNutrientsMap[entry.entry_id];

    if (!nutrients) {
      return result;
    }

    const scale = plannedWeight / baseWeight;

    for (const [nutrientId, data] of Object.entries(nutrients)) {
      const raw = String(data?.value ?? "0");
      const value = Number(raw.replace(",", "."));

      if (!Number.isFinite(value)) continue;

      result[nutrientId] = (result[nutrientId] ?? 0) + value * scale;
    }

    return result;
  }

  // =========================
  // 🛒 PRODUCT
  // =========================
  if (entry.entry_type === "product") {
    const weight = Number(entry.quantity_g) || 0;

    if (!weight) {
      return result;
    }

    const nutrients = maps.productNutrientsMap[entry.entry_id];

    if (!nutrients) {
      return result;
    }

    const multiplier = weight / 100;

    for (const [nutrientId, data] of Object.entries(nutrients)) {
      const raw = String(data?.value ?? "0");
      const valuePer100g = Number(raw.replace(",", "."));

      if (!Number.isFinite(valuePer100g)) continue;

      result[nutrientId] =
        (result[nutrientId] ?? 0) + valuePer100g * multiplier;
    }

    return result;
  }

  return result;
}
