import { RecipeType } from "@/shared/domain/recipe-type/recipe-type.types";
import { Cuisine } from "@/shared/domain/cuisine/cuisine.types";
import { DietaryTag } from "@/shared/domain/dietary-tag/dietary-tag.types";

export function mapRecipeTypesToOptions(types: RecipeType[]) {
  return types.map((t) => ({
    id: t.id,
    label: t.nameUa,
  }));
}

export function mapCuisinesToOptions(cuisines: Cuisine[]) {
  return cuisines.map((c) => ({
    id: c.id,
    label: c.nameUa,
  }));
}

export function mapDietaryTagsToOptions(tags: DietaryTag[]) {
  return tags.map((t) => ({
    id: t.id,
    label: t.nameUa,
  }));
}
