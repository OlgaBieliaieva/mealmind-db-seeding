"use client";

import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/domains/product/schemas/product-form.schema";
import { NutrientReference } from "@/domains/shared/types/nutrient.types";

type Props = {
  nutrient: NutrientReference;
  isRequired?: boolean;
};

export function NutrientRow({ nutrient, isRequired }: Props) {
  const { watch, setValue } = useFormContext<ProductFormValues>();

  const nutrients = watch("nutrients") ?? {};

  const value = nutrients[nutrient.nutrient_id]?.value ?? "";
  const unit = nutrients[nutrient.nutrient_id]?.unit ?? nutrient.default_unit;

  function updateValue(v: number) {
    setValue(
      `nutrients.${nutrient.nutrient_id}`,
      {
        value: v,
        unit,
      },
      { shouldDirty: true },
    );
  }

  function updateUnit(u: string) {
    setValue(
      `nutrients.${nutrient.nutrient_id}`,
      {
        value: value || 0,
        unit: u,
      },
      { shouldDirty: true },
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 items-center">
      <div className="text-sm">
        {isRequired ? `${nutrient.name.ua}*` : nutrient.name.ua}
      </div>

      <input
        type="number"
        value={value}
        onChange={(e) => updateValue(Number(e.target.value))}
        className="rounded border px-2 py-1"
      />

      <input
        value={unit}
        onChange={(e) => updateUnit(e.target.value)}
        className="rounded border px-2 py-1"
      />
    </div>
  );
}
