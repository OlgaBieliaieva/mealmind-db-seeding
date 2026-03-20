"use client";

// SECTION ███ PRODUCT FORM ███

import { useState } from "react";
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
  category_id: "",
  notes: "",
  is_verified: false,
  source: "",
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

  const { handleSubmit } = methods;

  const { submit, isSubmitting, isError, isSuccess } = useProductFormSubmit();

  async function onSubmit(values: ProductFormValues) {
    await submit(values);
  }

  return (
    <FormProvider {...methods}>
      <ProductFormContext.Provider value={{ parentLocked, setParentLocked }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
        >
          <FormStatus
            loading={isSubmitting}
            error={isError}
            success={isSuccess}
          />

          {PRODUCT_FORM_SECTIONS.map((Section, i) => (
            <Section key={i} />
          ))}

          <button
            disabled={isSubmitting}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Save
          </button>
        </form>
      </ProductFormContext.Provider>
    </FormProvider>
  );
}
