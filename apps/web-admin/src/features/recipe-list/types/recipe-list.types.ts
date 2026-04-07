export type RecipeListItemDto = {
  recipe_id: string;
  title: string;
  status: string;
  visibility: string;
  photo_url?: string | null;
  recipe_type_name?: string | null;
};

export type RecipeListResponse = {
  items: RecipeListItemDto[];
  total: number;
  page: number;
  limit: number;
};
