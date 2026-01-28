export type NutrientGroup = "macro" | "vitamin" | "mineral" | "other";

export type NutrientReference = {
  nutrient_id: string;
  code: string;
  name: {
    en: string;
    ua: string;
  };
  default_unit: string;
  nutrient_group: "macro" | "vitamin" | "mineral" | "other";
  sort_order: number;
};
