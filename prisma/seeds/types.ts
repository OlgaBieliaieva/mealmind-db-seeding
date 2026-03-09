export type NutrientRefRow = {
  nutrient_id: string;
  code: string;
  name_en: string;
  name_ua: string;
  default_unit: string;
  nutrient_group: string;
  sort_order: number;
  rda_value: number;
  rda_unit: string;
  notes: string;
  created_at: Date;
  updated_at: Date;
};
