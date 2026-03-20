"use client";

import { useFormContext } from "react-hook-form";

import { FormSection } from "@/domains/shared/components/form/FormSection";
import { useProductFormUI } from "@/domains/product/forms/product-form.context";

import { ProductFormValues } from "@/domains/product/schemas/product-form.schema";

export function ProductCookingFactorsSection() {
  const { register } = useFormContext<ProductFormValues>();

  const { parentLocked } = useProductFormUI();

  return (
    <FormSection
      title="Кулінарні коефіцієнти"
      description="Використовуються у розрахунках рецептур та нутрієнтів"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* edible part */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Їстівна частина (%)*</label>

          <input
            type="number"
            step="0.01"
            min={0}
            max={100}
            disabled={parentLocked}
            placeholder="наприклад 92"
            {...register("edible_part_pct", {
              valueAsNumber: true,
            })}
            className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
          />
        </div>

        {/* yield factor */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Коефіцієнт виходу*</label>

          <input
            type="number"
            step="0.01"
            min={0}
            disabled={parentLocked}
            placeholder="наприклад 0.85"
            {...register("yield_factor", {
              valueAsNumber: true,
            })}
            className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
          />
        </div>

        {/* cooking loss */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Втрати при приготуванні (%)*
          </label>

          <input
            type="number"
            step="0.01"
            min={0}
            max={100}
            disabled={parentLocked}
            placeholder="наприклад 12"
            {...register("cooking_loss_pct", {
              valueAsNumber: true,
            })}
            className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
          />
        </div>
      </div>

      {parentLocked && (
        <p className="text-xs text-gray-500">
          Значення наслідуються від базового продукту
        </p>
      )}
    </FormSection>
  );
}
