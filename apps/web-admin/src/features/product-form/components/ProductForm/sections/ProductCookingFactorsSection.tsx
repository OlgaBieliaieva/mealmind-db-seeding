"use client";

import { useFormContext } from "react-hook-form";

import { FormSection } from "@/shared/ui/form/FormSection";
import { useProductFormUI } from "../../../forms/product-form.context";
import { ProductFormInput } from "../../../schemas/product-form.schema";

export function ProductCookingFactorsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormInput>();

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
            {...register("edible_part_pct")}
            className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
          />

          {errors.edible_part_pct && (
            <p className="text-xs text-red-500">
              {errors.edible_part_pct.message}
            </p>
          )}
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
            {...register("yield_factor")}
            className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
          />

          {errors.yield_factor && (
            <p className="text-xs text-red-500">
              {errors.yield_factor.message}
            </p>
          )}
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
            {...register("cooking_loss_pct")}
            className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
          />

          {errors.cooking_loss_pct && (
            <p className="text-xs text-red-500">
              {errors.cooking_loss_pct.message}
            </p>
          )}
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
