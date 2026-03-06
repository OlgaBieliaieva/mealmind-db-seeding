// SECTION ███ NUTRIENT TYPES ███

import { NutrientGroup } from "@/domains/nutrition/constants/nutrient.constants";

export type NutrientReference = {

  nutrient_id: string;

  code: string;

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