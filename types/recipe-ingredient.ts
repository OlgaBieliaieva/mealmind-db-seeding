export type RecipeIngredientDraft = {
  id: string; // local uuid
  product_id: string | null;
  product_name?: string; // тільки для UI
  quantity_g: number;
  is_optional: boolean;
};
