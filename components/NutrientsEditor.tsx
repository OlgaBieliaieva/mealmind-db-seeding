"use client";

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { NutrientReference } from "@/types/nutrient.dto";
import { ProductFormValues } from "@/types/product-form.schema";

type Props = {
  nutrientsRef: NutrientReference[];
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
};

export function NutrientsEditor({ nutrientsRef, watch, setValue }: Props) {
  const formNutrients = watch("nutrients") ?? {};

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Nutrients (per 100 g / ml)</h3>

      <div className="grid grid-cols-3 gap-2 text-sm font-medium text-gray-600">
        <div>Nutrient</div>
        <div>Value</div>
        <div>Unit</div>
      </div>

      {nutrientsRef.map((nutrient) => {
        const current = formNutrients[nutrient.code];

        return (
          <div
            key={nutrient.code}
            className="grid grid-cols-3 items-center gap-2"
          >
            <div className="text-sm">{nutrient.name.ua}</div>

            <input
              type="number"
              min={0}
              step="any"
              value={current?.value ?? ""}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (!value || value <= 0) {
                  const rest = Object.fromEntries(
                    Object.entries(formNutrients).filter(
                      ([key]) => key !== nutrient.code,
                    ),
                  );

                  setValue("nutrients", rest, { shouldDirty: true });
                  return;
                }

                setValue(
                  `nutrients.${nutrient.code}`,
                  {
                    value,
                    unit: current?.unit ?? nutrient.default_unit,
                  },
                  { shouldDirty: true },
                );
              }}
              className="rounded border px-2 py-1"
            />

            <input
              type="text"
              value={current?.unit ?? nutrient.default_unit}
              onChange={(e) => {
                if (!current?.value) return;

                setValue(`nutrients.${nutrient.code}.unit`, e.target.value, {
                  shouldDirty: true,
                });
              }}
              className="rounded border px-2 py-1"
            />
          </div>
        );
      })}
    </div>
  );
}
