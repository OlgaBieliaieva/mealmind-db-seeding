"use client";

import { useFormContext } from "react-hook-form";
import { FormSection } from "@/domains/shared/components/form/FormSection";
import { ProductFormValues } from "@/domains/product/schemas/product-form.schema";
import { FormBarcodeField } from "@/domains/shared/components/form/FormBarcodeField";

export function ProductMetaSection() {
  const { register } = useFormContext<ProductFormValues>();

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
        </div>

        {/* notes */}

        <div>
          <label className="text-sm font-medium">Примітки</label>

          <textarea
            {...register("notes")}
            placeholder="Коментарі адміністратора"
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* is verified */}

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("is_verified")} />

          <span className="text-sm">Дані про продукт перевірено</span>
        </div>
      </div>
    </FormSection>
  );
}
