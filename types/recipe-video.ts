export type RecipeVideoPlatform = "youtube" | "instagram" | "tiktok";

export type RecipeVideo = {
  recipe_video_id: string;
  recipe_id: string;
  platform: RecipeVideoPlatform;
  url: string;
  author_name: string | null;
  author_url: string | null;
  created_at: string;
};

export type RecipeVideoDraft = {
  id: string; // локальний (uuid)
  platform: RecipeVideoPlatform;
  url: string;
  author_name?: string;
  author_url?: string;
};
