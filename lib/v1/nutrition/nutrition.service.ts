import { MenuEntry } from "@/types/menu-entry";
import { getProductNutrientsMap } from "./nutrition.read";
import { getRecipeNutrientsMap } from "@/lib/v1/recipes/recipe-nutrients.read";
import { aggregateEntriesNutrients } from "./nutrition.aggregate";
import { NutrientsMap } from "@/types/nutrients";
import { AggregatedNutrients } from "@/types/nutrition-aggregation";

type BuildParams = {
  entries: MenuEntry[];
  recipeWeightMap: Record<string, number>;
};

export async function buildPlanNutrition(params: BuildParams): Promise<{
  aggregated: AggregatedNutrients;
  productNutrientsMap: Record<string, NutrientsMap>;
  recipeNutrientsMap: Record<string, NutrientsMap>;
}> {
  // 🔹 PRODUCT IDS
  const productIds = Array.from(
    new Set(
      params.entries
        .filter((e) => e.entry_type === "product")
        .map((e) => e.entry_id),
    ),
  );

  const productNutrientsMap = await getProductNutrientsMap(productIds);

  // 🔹 RECIPE IDS
  const recipeIds = Array.from(
    new Set(
      params.entries
        .filter((e) => e.entry_type === "recipe")
        .map((e) => e.entry_id),
    ),
  );

  const recipeNutrientsMap = await getRecipeNutrientsMap(recipeIds);

  // 🔹 AGGREGATE
  const aggregated = aggregateEntriesNutrients(params.entries, {
    recipeWeightMap: params.recipeWeightMap,
    recipeNutrientsMap,
    productNutrientsMap,
  });

  return {
    aggregated,
    productNutrientsMap,
    recipeNutrientsMap,
  };
}
