"use client";

import { FormSection } from "@/shared/ui/form/FormSection";
import { FormRenderer } from "@/shared/ui/form/FormRenderer";

import { useRecipeTypes } from "@/shared/hooks/useRecipeTypes";
import { mapRecipeTypesToOptions } from "../../adapters/recipe.options.adapter";
import { getRecipeBasicFields } from "../../forms/recipeBasic.fields";

import { RECIPE_FORM_SECTION_CONTENT } from "../../forms/recipe.form.labels";

export function RecipeBasicSection() {
  const { data: recipeTypes } = useRecipeTypes();

  const options = recipeTypes ? mapRecipeTypesToOptions(recipeTypes) : [];

  const fields = getRecipeBasicFields(options);

  return (
    <FormSection
      title={RECIPE_FORM_SECTION_CONTENT.BASIC.title}
      description={RECIPE_FORM_SECTION_CONTENT.BASIC.description}
    >
      <FormRenderer fields={fields} />
    </FormSection>
  );
}
