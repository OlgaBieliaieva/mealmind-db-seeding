"use client";

// SECTION ███ PRODUCT FORM ███
// TODO Tree
// - basic info
// - brand
// - category
// - nutrients
// - photos

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductFormSchema,
  ProductFormValues,
} from "../../schemas/product-form.schema";

import { ProductFormContext } from "../../forms/product-form.context";

import { useProductFormSubmit } from "../../hooks/useProductFormSubmit";

import { FormStatus } from "@/domains/shared/components/form/FormStatus";

import { PRODUCT_FORM_SECTIONS } from "../../forms/productForm.registry";

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
  const [parentLocked, setParentLocked] = useState(false);
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const { submit, isSubmitting, isError, isSuccess } = useProductFormSubmit();

  useEffect(() => {
    if (isSuccess) {
      reset(defaultValues);
    }
  }, [isSuccess, reset]);

  async function onSubmit(values: ProductFormValues) {
    await submit(values);
  }

  return (
    <FormProvider {...methods}>
      <ProductFormContext.Provider value={{ parentLocked, setParentLocked }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormStatus
            loading={isSubmitting}
            error={isError}
            success={isSuccess}
          />

          {PRODUCT_FORM_SECTIONS.map((Section, i) => (
            <Section key={i} />
          ))}

          <button disabled={isSubmitting}>Save</button>
        </form>
      </ProductFormContext.Provider>
    </FormProvider>
  );
}
