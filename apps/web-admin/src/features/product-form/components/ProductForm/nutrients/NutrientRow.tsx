"use client";

import { useFormContext, Path } from "react-hook-form";
import { ProductFormInput } from "../../../schemas/product-form.schema";
import { NutrientReference } from "@/shared/domain/nutrition/nutrient.types";

type Props = {
  nutrient: NutrientReference;
  isRequired?: boolean;
};

export function NutrientRow({ nutrient, isRequired }: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormInput>();

  const error = errors.nutrients?.[nutrient.nutrient_id]?.value;

  const nutrients = watch("nutrients") ?? {};

  const value = nutrients[nutrient.nutrient_id]?.value ?? "";
  const unit = nutrients[nutrient.nutrient_id]?.unit ?? nutrient.rda_unit;

  function updateValue(v: string) {
    setValue(
      `nutrients.${nutrient.nutrient_id}` as Path<ProductFormInput>,
      {
        value: v,
        unit,
      },
      { shouldDirty: true, shouldValidate: true },
    );
  }

  function updateUnit(u: string) {
    setValue(
      `nutrients.${nutrient.nutrient_id}`,
      {
        value: value || "",
        unit: u,
      },
      { shouldDirty: true, shouldValidate: true },
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 items-start">
      <div className="text-sm">
        {isRequired ? `${nutrient.name.ua}*` : `${nutrient.name.ua}`}
      </div>

      <div>
        <input
          type="number"
          value={value}
          onChange={(e) => updateValue(e.target.value)}
          className="max-w-full rounded border px-2 py-1"
        />
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </div>
      <input
        value={unit}
        onChange={(e) => updateUnit(e.target.value)}
        className="rounded border px-2 py-1"
      />
    </div>
  );
}
