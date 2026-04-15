"use client";

import { useRouter } from "next/navigation";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { FormSection } from "@/shared/ui/form/FormSection";
import { IngredientRow } from "../ingredients/IngredientRow";
import { RECIPE_FORM_SECTION_CONTENT } from "../../forms/recipe.form.labels";
import { setRecipeDraft } from "@/shared/lib/recipe/recipe-draft";

export function RecipeIngredientsSection() {
  const { control, getValues } = useFormContext<RecipeCreateInput>();

  
  const router = useRouter();

  

  const { fields,  remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  

  function handleAddIngredientClick() {
    const values = getValues();

    setRecipeDraft(values);

    router.push("/admin/products/select");
  }

  return (
    <FormSection
      title={RECIPE_FORM_SECTION_CONTENT.INGREDIENTS.title}
      description={RECIPE_FORM_SECTION_CONTENT.INGREDIENTS.description}
    >
      <div className="space-y-3">
        {fields.map((field, index) => (
          <IngredientRow
            key={field.id}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}

        <button
          type="button"
          onClick={handleAddIngredientClick}
          className="inline-block rounded border px-3 py-1 text-sm"
        >
          + Додати інгредієнт
        </button>
      </div>
    </FormSection>
  );
}
