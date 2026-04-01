"use client";

import { useFormContext } from "react-hook-form";
import { FormSection } from "@/shared/ui/form/FormSection";
import { ProductFormInput } from "../../../schemas/product-form.schema";
import { FormBarcodeField } from "@/shared/ui/form/FormBarcodeField";

export function ProductMetaSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormInput>();

  return (
    <FormSection
      title="Додаткова інформація"
      description="Ідентифікатори та службові дані продукту"
    >
      <div className="space-y-4">
        {/* barcode */}
        <FormBarcodeField name="barcode" label="Штрихкод" />

        {/* source */}

        <div>
          <label className="text-sm font-medium">Джерело</label>

          <input
            {...register("source")}
            placeholder="USDA / OpenFoodFacts / Manual"
            className="mt-1 w-full rounded border px-3 py-2"
          />

          {errors.source && (
            <p className="text-xs text-red-500">{errors.source.message}</p>
          )}
        </div>

        {/* notes */}

        <div>
          <label className="text-sm font-medium">Примітки</label>

          <textarea
            {...register("notes")}
            placeholder="Коментарі адміністратора"
            className="mt-1 w-full rounded border px-3 py-2"
          />

          {errors.notes && (
            <p className="text-xs text-red-500">{errors.notes.message}</p>
          )}
        </div>

        {/* is verified */}

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("is_verified")} />
          <span className="text-sm">Дані про продукт перевірено</span>

          {errors.is_verified && (
            <p className="text-xs text-red-500">{errors.is_verified.message}</p>
          )}
        </div>
      </div>
    </FormSection>
  );
}
