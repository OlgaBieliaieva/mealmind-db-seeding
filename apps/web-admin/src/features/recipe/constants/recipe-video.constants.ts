// recipe-video.constants.ts

export const RECIPE_VIDEO_PLATFORM = {
  YOUTUBE: "youtube",
  INSTAGRAM: "instagram",
  TIKTOK: "tiktok",
} as const;

export type RecipeVideoPlatform =
  (typeof RECIPE_VIDEO_PLATFORM)[keyof typeof RECIPE_VIDEO_PLATFORM];
