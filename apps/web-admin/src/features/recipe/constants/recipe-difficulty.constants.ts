export const RECIPE_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

export type RecipeDifficulty =
  (typeof RECIPE_DIFFICULTY)[keyof typeof RECIPE_DIFFICULTY];

export const RECIPE_DIFFICULTY_LABELS: Record<RecipeDifficulty, string> = {
  easy: "Легко",
  medium: "Середньо",
  hard: "Складно",
};
