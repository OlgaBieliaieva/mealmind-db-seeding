import {
  RECIPE_DIFFICULTY,
  RECIPE_DIFFICULTY_LABELS,
} from "@/features/recipe/constants/recipe-difficulty.constants";

export const RECIPE_DIFFICULTY_OPTIONS = Object.values(RECIPE_DIFFICULTY).map(
  (value) => ({
    value,
    label: RECIPE_DIFFICULTY_LABELS[value],
  }),
);
