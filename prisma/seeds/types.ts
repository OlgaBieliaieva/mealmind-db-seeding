export type BrandRow = {
  brand_id: string;
  name_en: string;
  name_ua: string;
  country: string;
  website: string;
  is_verified: string;
  notes: string;
  created_at: Date;
  updated_at: Date;
};

export type CuisineRow = {
  cuisine_id: string;
  code: string;
  name_en: string;
  name_ua: string;
  region: string;
  is_active: string;
};

export type DietaryTagRow = {
  dietary_tag_id: string;
  code: string;
  name_en: string;
  name_ua: string;
  is_active: string;
};

export type MealTypeRow = {
  meal_type_id: string;
  code: string;
  name_en: string;
  name_ua: string;
  order_index: number;
};

export type NutrientRow = {
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

export type RecipeTypeRow = {
  recipe_type_id: string;
  code: string;
  name_en: string;
  name_ua: string;
  notes: string;
};

export type CategoryRow = {
  category_id: string;
  name_en: string;
  name_ua: string;
  parent_id: string;
};
