import { FormFieldConfig } from "@/shared/ui/form/form.types";
import { RecipeCreateInput } from "../schemas/recipe.create.schema";

import { RECIPE_FORM_LABELS } from "./recipe.form.labels";
import { RECIPE_DIFFICULTY_OPTIONS } from "./recipe.ui.options";

export function getRecipeMetaFields(): FormFieldConfig<RecipeCreateInput>[] {
  return [
    {
      type: "input",
      valueType: "number",
      name: "recipe.prep_time_min",
      label: RECIPE_FORM_LABELS.PREP_TIME,
    },
    {
      type: "input",
      valueType: "number",
      name: "recipe.cook_time_min",
      label: RECIPE_FORM_LABELS.COOK_TIME,
    },
    {
      type: "select",
      name: "recipe.difficulty",
      label: RECIPE_FORM_LABELS.DIFFICULTY,
      options: RECIPE_DIFFICULTY_OPTIONS,
    },
  ];
}
