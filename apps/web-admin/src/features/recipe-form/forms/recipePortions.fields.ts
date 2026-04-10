import { Path } from "react-hook-form";
import { RecipeCreateInput } from "../schemas/recipe.create.schema";
import { RECIPE_FORM_LABELS } from "./recipe.form.labels";

export function getRecipePortionsMainFields(): {
  name: Path<RecipeCreateInput>;
  label: string;
  type: "input";
}[] {
  return [
        {
          name: "recipe.base_servings",
          label: RECIPE_FORM_LABELS.PORTIONS.SERVINGS,
          type: "input",
        },
      ];
}

export function getRecipePortionsOptionalFields(): {
  name: Path<RecipeCreateInput>;
  label: string;
  type: "input";
}[] {
  return [
    {
      name: "recipe.base_output_weight_g",
      label: RECIPE_FORM_LABELS.PORTIONS.OUTPUT_WEIGHT,
      type: "input",
    },
    {
      name: "recipe.container_weight_g",
      label: RECIPE_FORM_LABELS.PORTIONS.CONTAINER_WEIGHT,
      type: "input",
    },
  ];
}