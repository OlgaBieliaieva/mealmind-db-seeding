"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { FormSection } from "@/shared/ui/form/FormSection";
import { StepRow } from "../steps/StepRow";
import { RECIPE_FORM_SECTION_CONTENT } from "../../forms/recipe.form.labels";

export function RecipeStepsSection() {
  const { control } = useFormContext<RecipeCreateInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  function addStep() {
    append({
      step_number: fields.length + 1,
      instruction: "",
      timer_sec: undefined,
    });
  }

  return (
    <FormSection
      title={RECIPE_FORM_SECTION_CONTENT.STEPS.title}
      description={RECIPE_FORM_SECTION_CONTENT.STEPS.description}
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <StepRow
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}

        <button
          type="button"
          onClick={addStep}
          className="rounded border px-3 py-1 text-sm"
        >
          + Додати крок
        </button>
      </div>
    </FormSection>
  );
}
