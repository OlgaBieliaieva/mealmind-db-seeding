"use client";

import { useFormContext } from "react-hook-form";
import { useBrands } from "@/src/shared/hooks/useBrands";
import { FormSection } from "@/src/shared/ui/form/FormSection";
import { ProductFormValues } from "../../../schemas/product-form.schema";

import { BrandDto } from "../../../schemas/brand.schema";
import { PRODUCT_LABELS } from "../../../forms/product.form.labels";

export function ProductBrandSection() {
  const { register, watch } = useFormContext<ProductFormValues>();
  const { data: brands, isLoading } = useBrands();

  const type = watch("type");
  const brandId = watch("brand_id");

  if (type !== "branded") return null;

  function getBrandDisplayName(b: BrandDto) {
    if (!b.country) return b.name.en ?? b.name.ua;

    if (b.country.toLowerCase() === "україна") {
      return b.name.ua ?? b.name.en;
    }

    return b.name.en ?? b.name.ua;
  }

  return (
    <FormSection title="Бренд" description="Оберіть або створіть бренд">
      <div className="space-y-3">
        <label className="text-sm font-medium">{PRODUCT_LABELS.BRAND}</label>

        {isLoading ? (
          <p className="text-sm text-gray-500">Завантажуємо бренди...</p>
        ) : (
          <select
            {...register("brand_id")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Оберіть бренд</option>

            {brands?.map((b) => (
              <option key={b.brand_id} value={b.brand_id}>
                {getBrandDisplayName(b)}
              </option>
            ))}

            <option value="__new__">➕ Додати новий</option>
          </select>
        )}

        {brandId === "__new__" && (
          <div className="space-y-3 rounded border p-3">
            <input
              {...register("new_brand_name_ua")}
              placeholder="Назва бренду UA"
              className="w-full rounded border px-3 py-2"
            />

            <input
              {...register("new_brand_name_en")}
              placeholder="Назва бренду EN"
              className="w-full rounded border px-3 py-2"
            />

            <input
              {...register("new_brand_country")}
              placeholder="Країна"
              className="w-full rounded border px-3 py-2"
            />
          </div>
        )}
      </div>
    </FormSection>
  );
}
