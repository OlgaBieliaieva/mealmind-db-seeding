"use client";

import { FormSection } from "@/shared/ui/form/FormSection";

import { useCuisines } from "@/shared/hooks/useCuisines";
import { useDietaryTags } from "@/shared/hooks/useDietaryTags";

import {
  mapCuisinesToOptions,
  mapDietaryTagsToOptions,
} from "../../adapters/recipe.options.adapter";

import {
  RECIPE_FORM_SECTION_CONTENT,
  RECIPE_FORM_LABELS,
} from "../../forms/recipe.form.labels";

import { CuisineMultiSelect } from "../inputs/CuisineMultiSelect";
import { DietaryTagsMultiSelect } from "../inputs/DietaryTagsMultiSelect";

export function RecipeClassificationSection() {
  const { data: cuisines } = useCuisines();
  const { data: dietaryTags } = useDietaryTags();

  const cuisineOptions = cuisines ? mapCuisinesToOptions(cuisines) : [];

  const dietaryOptions = dietaryTags
    ? mapDietaryTagsToOptions(dietaryTags)
    : [];

  return (
    <FormSection
      title={RECIPE_FORM_SECTION_CONTENT.CLASSIFICATION.title}
      description={RECIPE_FORM_SECTION_CONTENT.CLASSIFICATION.description}
    >
      <div className="space-y-4">
        {/* CUISINE */}
        <div className="space-y-2">
          <div className="text-sm font-medium">
            {RECIPE_FORM_LABELS.CUISINE}
          </div>

          <CuisineMultiSelect options={cuisineOptions} />
        </div>

        {/* DIETARY */}
        <div className="space-y-2">
          <div className="text-sm font-medium">
            {RECIPE_FORM_LABELS.DIETARY}
          </div>

          <DietaryTagsMultiSelect options={dietaryOptions} />
        </div>
      </div>
    </FormSection>
  );
}
