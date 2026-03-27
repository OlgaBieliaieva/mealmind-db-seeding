// SECTION ███ NUTRIENT TYPES ███

import { NutrientGroup } from "@/src/features/product-nutrients/constants/nutrient.constants";
import { NutrientCode } from "@/src/features/product-nutrients/constants/nutrient.codes";

export type NutrientReference = {
  nutrient_id: string;

  code: NutrientCode;

  name: {
    en: string;

    ua: string;
  };

  default_unit: string;

  nutrient_group: NutrientGroup;

  sort_order: number;

  rda_value?: number;

  rda_unit?: string;
};
