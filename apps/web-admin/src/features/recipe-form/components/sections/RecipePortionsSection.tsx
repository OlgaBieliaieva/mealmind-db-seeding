"use client";

import { useFormContext } from "react-hook-form";

import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { FormSection } from "@/shared/ui/form/FormSection";
import { FormRenderer } from "@/shared/ui/form/FormRenderer";

import {
  getRecipePortionsMainFields,
  getRecipePortionsOptionalFields,
} from "../../forms/recipePortions.fields";
import { RECIPE_FORM_SECTION_CONTENT } from "../../forms/recipe.form.labels";

export function RecipePortionsSection() {
  const { watch, register, setValue } = useFormContext<RecipeCreateInput>();

  const mode = watch("recipe.output_weight_mode");
  const container_weight_g = watch("recipe.container_weight_g");

  const mainFields = getRecipePortionsMainFields();
  const optionalFields = getRecipePortionsOptionalFields();

  return (
    <FormSection
      title={RECIPE_FORM_SECTION_CONTENT.PORTIONS.title}
      description={RECIPE_FORM_SECTION_CONTENT.PORTIONS.description}
    >
      <FormRenderer fields={mainFields} />

      <span className="text-sm font-medium ьи-1">Вага готової страви</span>
      {/* 🔘 TOGGLE */}
      <div className="flex gap-4 mb-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="auto"
            {...register("recipe.output_weight_mode")}
            checked={mode !== "manual"}
            onChange={() => setValue("recipe.output_weight_mode", "auto")}
          />
          Автоматично
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="manual"
            {...register("recipe.output_weight_mode")}
            checked={mode === "manual"}
            onChange={() => setValue("recipe.output_weight_mode", "manual")}
          />
          Вручну
        </label>
      </div>

      {/* 🔥 FIELDS ТІЛЬКИ В MANUAL */}
      {mode === "manual" && <FormRenderer fields={optionalFields} />}

      {/* 💡 helper */}
      {mode !== "manual" && (
        <div className="text-xs text-gray-400">
          Вага розраховується автоматично з інгредієнтів
        </div>
      )}

      {/* 💡 container info */}
      {mode === "manual" && Number(container_weight_g) > 0 && (
        <div className="text-sm text-gray-500 mt-2">
          Вага буде зменшена на контейнер
        </div>
      )}
    </FormSection>
  );
}
