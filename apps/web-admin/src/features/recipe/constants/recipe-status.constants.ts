export const RECIPE_STATUS = {
  DRAFT: "draft",
  READY: "ready",
  PUBLISHED: "published",
  ARCHIVED: "archived",
} as const;

export type RecipeStatus = (typeof RECIPE_STATUS)[keyof typeof RECIPE_STATUS];

export const RECIPE_STATUS_LABELS: Record<RecipeStatus, string> = {
  draft: "Чернетка",
  ready: "Готовий",
  published: "Опублікований",
  archived: "Архів",
};
