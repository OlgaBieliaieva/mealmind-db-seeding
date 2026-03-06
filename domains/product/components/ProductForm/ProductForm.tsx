"use client";

// SECTION ███ PRODUCT FORM ███
// TODO Tree
// - basic info
// - brand
// - category
// - nutrients
// - photos

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductFormSchema,
  ProductFormValues,
} from "../../schemas/product-form.schema";

import { ProductBasicSection } from "./sections/ProductBasicSection";
import { ProductCategorySection } from "./sections/ProductCategorySection";

import { useCreateProduct } from "../../hooks/useCreateProduct";

import { mapProductFormToProductInput } from "../../mappers/productFormToProductInput.mapper";

import { PRODUCT_LABELS } from "../../constants/product.labels";

const defaultValues: ProductFormValues = {
  name_en: "",
  name_ua: "",
  type: "branded",
  unit: "g",
  category_id: undefined,
  subcategory_id: undefined,
  notes: "",
  is_verified: false,
  brand_id: undefined,
  new_brand_name_en: "",
  new_brand_name_ua: "",
  parent_product_id: undefined,
  barcode: undefined,
  nutrients: {},
  photos: [],
};

export function ProductForm() {
  const createProduct = useCreateProduct();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues,
  });

  async function onSubmit(values: ProductFormValues) {
    const payload = mapProductFormToProductInput(values);

    await createProduct.mutateAsync(payload);

    reset(defaultValues);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProductBasicSection register={register} errors={errors} />

      <ProductCategorySection
        register={register}
        watch={watch}
        errors={errors}
      />

      <button
        type="submit"
        className="w-full rounded bg-black px-4 py-3 text-white"
      >
        {PRODUCT_LABELS.SAVE}
      </button>
    </form>
  );
}
