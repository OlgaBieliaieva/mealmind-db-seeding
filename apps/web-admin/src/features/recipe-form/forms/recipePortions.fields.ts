import { RecipeCreateInput } from "../schemas/recipe.create.schema";
import { RECIPE_FORM_LABELS } from "./recipe.form.labels";
import { FormFieldConfig } from "@/shared/ui/form/form.types";

export function getRecipePortionsMainFields(): FormFieldConfig<RecipeCreateInput>[] {
  return [
    {
      name: "recipe.base_servings",
      label: RECIPE_FORM_LABELS.PORTIONS.SERVINGS,
      type: "input",
      valueType: "number",
    },
  ];
}

export function getRecipePortionsOptionalFields(): FormFieldConfig<RecipeCreateInput>[] {
  return [
    {
      name: "recipe.base_output_weight_g",
      label: RECIPE_FORM_LABELS.PORTIONS.OUTPUT_WEIGHT,
      type: "input",
      valueType: "number",
    },
    {
      name: "recipe.container_weight_g",
      label: RECIPE_FORM_LABELS.PORTIONS.CONTAINER_WEIGHT,
      type: "input",
      valueType: "number",
    },
  ];
}
