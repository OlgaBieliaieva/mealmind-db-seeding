// SECTION ███ RECIPE ENUMS ███

export const RECIPE_STATUS = {
  DRAFT: "draft",
  READY: "ready",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type RecipeStatus = (typeof RECIPE_STATUS)[keyof typeof RECIPE_STATUS];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const RECIPE_VISIBILITY = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;

export type RecipeVisibility =
  (typeof RECIPE_VISIBILITY)[keyof typeof RECIPE_VISIBILITY];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const RECIPE_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

export type RecipeDifficulty =
  (typeof RECIPE_DIFFICULTY)[keyof typeof RECIPE_DIFFICULTY];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const RECIPE_AUTHOR_TYPE = {
  USER: "user",
  BLOGGER: "blogger",
  SYSTEM: "system",
} as const;

export type RecipeAuthorType =
  (typeof RECIPE_AUTHOR_TYPE)[keyof typeof RECIPE_AUTHOR_TYPE];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const RECIPE_VIDEO_PLATFORM = {
  YOUTUBE: "youtube",
  INSTAGRAM: "instagram",
  TIKTOK: "tiktok",
  OTHER: "other",
} as const;

export type RecipeVideoPlatform =
  (typeof RECIPE_VIDEO_PLATFORM)[keyof typeof RECIPE_VIDEO_PLATFORM];
