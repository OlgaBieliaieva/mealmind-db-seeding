import { RecipeType } from "@/shared/domain/recipe-type/recipe-type.types";
import { Cuisine } from "@/shared/domain/cuisine/cuisine.types";
import { DietaryTag } from "@/shared/domain/dietary-tag/dietary-tag.types";
import { RecipeAuthorDto } from "@/shared/domain/recipe-authors/recipe-authors.types";

export function mapRecipeTypesToOptions(types: RecipeType[]) {
  return types.map((t) => ({
    id: t.id,
    label: t.name.ua,
  }));
}

export function mapCuisinesToOptions(cuisines: Cuisine[]) {
  return cuisines.map((c) => ({
    id: c.id,
    label: c.name.ua,
  }));
}

export function mapDietaryTagsToOptions(tags: DietaryTag[]) {
  return tags.map((t) => ({
    id: t.id,
    label: t.name.ua,
  }));
}

export function mapRecipeAuthorsToOptions(authors: RecipeAuthorDto[]) {
  return authors.map((a) => ({
    id: a.id,
    label: a.display_name,
  }));
}
