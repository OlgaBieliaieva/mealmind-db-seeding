import {
  RecipeVisibility,
  RECIPE_VISIBILITY_LABELS,
} from "@/features/recipe/constants/recipe-visibility.constants";

export function getRecipeVisibilityLabel(v: RecipeVisibility) {
  return RECIPE_VISIBILITY_LABELS[v];
}

export function getRecipeVisibilityVariant(v: RecipeVisibility) {
  switch (v) {
    case "public":
      return "success";
    case "private":
      return "info";
    default:
      return "neutral";
  }
}
