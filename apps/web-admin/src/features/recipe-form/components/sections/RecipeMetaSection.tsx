"use client";

import { FormSection } from "@/shared/ui/form/FormSection";
import { FormRenderer } from "@/shared/ui/form/FormRenderer";

import { getRecipeMetaFields } from "../../forms/recipeMeta.fields";
import { RecipeCreateInput } from "../../schemas/recipe.create.schema";

import { RECIPE_FORM_SECTION_CONTENT } from "../../forms/recipe.form.labels";

export function RecipeMetaSection() {
  const fields = getRecipeMetaFields();

  return (
    <FormSection
      title={RECIPE_FORM_SECTION_CONTENT.META.title}
      description={RECIPE_FORM_SECTION_CONTENT.META.description}
    >
      <FormRenderer<RecipeCreateInput> fields={fields} />
    </FormSection>
  );
}
