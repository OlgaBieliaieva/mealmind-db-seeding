import { FormFieldConfig } from "@/shared/ui/form/form.types";
import { RecipeCreateInput } from "../schemas/recipe.create.schema";
import { RECIPE_FORM_LABELS } from "./recipe.form.labels";

export function getRecipeBasicFields(
  recipeTypeOptions: { value: string; label: string }[],
): FormFieldConfig<RecipeCreateInput>[] {
  return [
    {
      type: "input",
      name: "recipe.title",
      label: RECIPE_FORM_LABELS.TITLE,
    },
    {
      type: "textarea",
      name: "recipe.description",
      label: RECIPE_FORM_LABELS.DESCRIPTION,
    },
    {
      type: "select",
      name: "recipe.recipe_type_id",
      label: RECIPE_FORM_LABELS.TYPE,
      options: recipeTypeOptions,
    },
  ];
}
