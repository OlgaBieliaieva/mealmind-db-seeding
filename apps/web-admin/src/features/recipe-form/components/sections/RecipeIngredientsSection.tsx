"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { FormSection } from "@/shared/ui/form/FormSection";
import { IngredientRow } from "../ingredients/IngredientRow";
import { RECIPE_FORM_SECTION_CONTENT } from "../../forms/recipe.form.labels";

import {
  getSelectedProducts,
  clearSelectedProducts,
} from "@/shared/lib/selection/recipe-selection";

export function RecipeIngredientsSection() {
  const { control } = useFormContext<RecipeCreateInput>();

  const params = useSearchParams();
  const router = useRouter();

  const fromSelect = params.get("fromSelect");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const processedRef = useRef(false);

  useEffect(() => {
    if (!fromSelect || processedRef.current) return;

    processedRef.current = true;

    const selected = Object.values(getSelectedProducts());

    append(
      selected.map((p, index) => ({
        product_id: p.product_id,
        quantity_g: p.quantity_g,
        product_name: p.name,
        product_brand: p.brand,
        product_unit: p.unit,
        is_optional: false,
        order_index: fields.length + index + 1,
      })),
    );

    clearSelectedProducts();

    router.replace("/admin/recipes/new");
  }, [fromSelect, append, router, fields.length]);

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

        <Link
          href="/admin/products/select"
          className="inline-block rounded border px-3 py-1 text-sm"
        >
          + Додати інгредієнт
        </Link>
      </div>
    </FormSection>
  );
}
