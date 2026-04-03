export const RECIPE_VISIBILITY = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;

export type RecipeVisibility =
  (typeof RECIPE_VISIBILITY)[keyof typeof RECIPE_VISIBILITY];

export const RECIPE_VISIBILITY_LABELS: Record<RecipeVisibility, string> = {
  private: "Приватний",
  public: "Публічний",
};
