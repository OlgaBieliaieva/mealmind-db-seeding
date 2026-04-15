export type RecipeListItemDto = {
  recipe_id: string;
  title: string;
  status: string;
  visibility: string;

  recipe_type: string | null;
  difficulty: string | null;

  prep_time_min: number | null;
  cook_time_min: number | null;

  photo_url: string | null;
  author: string | null;

  created_at: string;

  calories_per_100g: number | null;
};

export type RecipeListResponse = {
  items: RecipeListItemDto[];
  total: number;
  page: number;
  limit: number;
};
