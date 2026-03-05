import { RecipeAuthorType } from "@/types/recipe-author";

const ALLOWED_TYPES = ["user", "blogger", "system"] as const;

export function parseRecipeAuthorType(value: unknown): RecipeAuthorType {
  if (ALLOWED_TYPES.includes(value as RecipeAuthorType)) {
    return value as RecipeAuthorType;
  }

  // fallback — краще system, ніж зламати білд
  return "system";
}
