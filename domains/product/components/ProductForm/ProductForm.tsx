"use client";

// SECTION ███ PRODUCT FORM ███
// TODO Tree
// - basic info
// - brand
// - category
// - nutrients
// - photos

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductFormSchema,
  ProductFormValues,
} from "../../schemas/product-form.schema";

import { ProductBasicSection } from "./sections/ProductBasicSection";
import { ProductCategorySection } from "./sections/ProductCategorySection";
import { ProductBrandSection } from "./sections/ProductBrandSection";

import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useCreateBrand } from "../../hooks/useCreateBrand";

import { mapProductFormToProductInput } from "../../mappers/productFormToProductInput.mapper";

import { PRODUCT_LABELS } from "../../constants/product.labels";

const defaultValues: ProductFormValues = {
  name_en: "",
  name_ua: "",
  type: "branded",
  unit: "g",
  category_id: undefined,
  notes: "",
  is_verified: false,
  raw_or_cooked_default: "raw",
  brand_id: undefined,
  new_brand_name_en: "",
  new_brand_name_ua: "",
  new_brand_country: "",
  parent_product_id: undefined,
  barcode: undefined,
  nutrients: {},
  photos: [],
};

export function ProductForm() {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const createProduct = useCreateProduct();
  const createBrand = useCreateBrand();

  const isSubmitting = createBrand.isPending || createProduct.isPending;

  const isError = createBrand.isError || createProduct.isError;

  const isSuccess = createProduct.isSuccess;

  async function onSubmit(values: ProductFormValues) {
    let brandId = values.brand_id;

    if (values.type === "branded" && brandId === "__new__") {
      const en = values.new_brand_name_en?.trim();
      const ua = values.new_brand_name_ua?.trim();

      if (!en || !ua) return;

      const created = await createBrand.mutateAsync({
        name: { en, ua },
        country: values.new_brand_country?.trim() || undefined,
      });

      brandId = created.brand_id;
    }

    const payload = mapProductFormToProductInput({
      ...values,
      brand_id: brandId,
    });

    await createProduct.mutateAsync(payload);

    reset(defaultValues);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {isSubmitting && <p className="text-sm text-gray-500">Зберігаємо...</p>}

        {isError && (
          <p className="text-sm text-red-600">Помилка при додаванні продукту</p>
        )}

        {isSuccess && (
          <p className="text-sm text-green-600">Продукт створено</p>
        )}

        <ProductBasicSection />
        <ProductBrandSection />
        <ProductCategorySection />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Зберігаємо..." : PRODUCT_LABELS.SAVE}
        </button>
      </form>
    </FormProvider>
  );
}
