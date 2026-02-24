import { MenuEntry } from "@/types/menu-entry";
import { getProductNutrientsMap } from "./nutrition.read";
import { aggregateEntriesNutrients } from "./nutrition.aggregate";
import { NutrientsMap } from "@/types/nutrients";

type BuildParams = {
  entries: MenuEntry[];
  recipeWeightMap: Record<string, number>;
  recipeNutrientsMap: Record<string, NutrientsMap>;
};

export async function buildPlanNutrition(params: BuildParams) {
  const productIds = Array.from(
    new Set(
      params.entries
        .filter((e) => e.entry_type === "product")
        .map((e) => e.entry_id),
    ),
  );

  const productNutrientsMap = await getProductNutrientsMap(productIds);

  const aggregated = aggregateEntriesNutrients(params.entries, {
    recipeWeightMap: params.recipeWeightMap,
    recipeNutrientsMap: params.recipeNutrientsMap,
    productNutrientsMap,
  });

  return {
    aggregated,
    productNutrientsMap,
  };
}
