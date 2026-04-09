import {
  RecipeType,
  RecipeCuisine,
  RecipeDietaryTag,
} from "@/shared/domain/recipe-type/recipe-type.types";

export function mapRecipeTypesToOptions(items: RecipeType[]) {
  return items.map((t) => ({
    value: t.id,
    label: t.name.ua,
  }));
}

export function mapCuisinesToOptions(items: RecipeCuisine[]) {
  return items.map((c) => ({
    value: c.id,
    label: c.name.ua,
  }));
}

export function mapDietaryTagsToOptions(items: RecipeDietaryTag[]) {
  return items.map((t) => ({
    value: t.id,
    label: t.name.ua,
  }));
}
