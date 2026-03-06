import { AggregatedNutrients } from "@/types/nutrition-aggregation";
import { NutrientReference } from "@/domains/shared/types/nutrient.types";

export type NutritionDisplayItem = {
  code: string;
  name: string;
  value: number;
  unit: string;
  group: string;
  sort_order: number;
  rda_value?: number;
  rda_unit?: string;
};

export function mapNutritionToDisplay(
  aggregated: AggregatedNutrients,
  refs: NutrientReference[],
): NutritionDisplayItem[] {
  return refs
    .map((ref) => {
      const value = aggregated[ref.nutrient_id] ?? 0;

      return {
        code: ref.code,
        name: ref.name.ua,
        value,
        unit: ref.default_unit,
        group: ref.nutrient_group,
        sort_order: ref.sort_order,
        rda_value: ref.rda_value,
        rda_unit: ref.rda_unit,
      };
    })
    .sort((a, b) => a.sort_order - b.sort_order);
}
