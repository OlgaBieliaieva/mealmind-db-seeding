import {
  RecipeStatus,
  RECIPE_STATUS_LABELS,
} from "@/features/recipe/constants/recipe-status.constants";

export function getRecipeStatusLabel(v: RecipeStatus) {
  return RECIPE_STATUS_LABELS[v];
}

export function getRecipeStatusVariant(v: RecipeStatus) {
  switch (v) {
    case "draft":
      return "neutral";
    case "ready":
      return "info";
    case "published":
      return "success";
    default:
      return "neutral";
  }
}
