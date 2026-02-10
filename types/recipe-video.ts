export type RecipeVideoPlatform = "youtube" | "instagram" | "tiktok";

export type RecipeVideo = {
  recipe_video_id: string;
  recipe_id: string;
  recipe_author_id: string | null;
  platform: RecipeVideoPlatform;
  url: string;
  created_at: string;
};

export type RecipeVideoDraft = {
  id: string;
  platform: RecipeVideoPlatform;
  url: string;
  recipe_author_id: string | null;
};
