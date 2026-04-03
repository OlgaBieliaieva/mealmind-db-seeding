export const RECIPE_VIDEO_PLATFORM = {
  YOUTUBE: "youtube",
  INSTAGRAM: "instagram",
  TIKTOK: "tiktok",
  OTHER: "other",
} as const;

export type RecipeVideoPlatform =
  (typeof RECIPE_VIDEO_PLATFORM)[keyof typeof RECIPE_VIDEO_PLATFORM];
