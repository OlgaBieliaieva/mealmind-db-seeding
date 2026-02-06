export type RecipeIngredientDraft = {
  id: string; // local uuid
  product_id: string | null;
  product_name?: string; // тільки для UI
  quantity_g: number;
  is_optional: boolean;
};

export type RecipeIngredientView = {
  id: string;
  product_id: string;
  product_name: string;
  brand_name?: string | null;
  quantity_g: number;
  is_optional: boolean;
  order: number;
};
