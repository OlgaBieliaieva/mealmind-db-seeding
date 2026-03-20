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

import { useProductFormFlow } from "../../hooks/useProductFormFlow";
import { useDirtyGuard } from "@/domains/shared/hooks/useDirtyGuard";

import { FormStatus } from "@/domains/shared/components/form/FormStatus";

import { PRODUCT_FORM_SECTIONS } from "../../forms/productForm.registry";
import { ProductEditNavigation } from "@/domains/admin/products/components/ProductEditNavigation";

type Props = {
  mode?: "create" | "edit";
  initialValues?: ProductFormValues;
  productId?: string;
};

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

export function ProductForm({
  mode = "create",
  initialValues = defaultValues,
  productId,
}: Props) {
  const [manualParentLock, setManualParentLock] = useState(false);

  const parentLocked = mode === "edit" || manualParentLock;

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
    formState,
    formState: { isDirty },
  } = methods;

  useDirtyGuard({
    enabled: mode === "edit" && isDirty,
  });

  const { submit, isSubmitting, isError, isSuccess } = useProductFormFlow(
    mode,
    productId,
  );

  async function onSubmit(values: ProductFormValues) {
    await submit(values);
  }

  return (
    <FormProvider {...methods}>
      <ProductFormContext.Provider
        value={{
          parentLocked,
          setParentLocked: setManualParentLock,
        }}
      >
        <ProductEditNavigation />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <FormStatus
            loading={isSubmitting}
            error={isError}
            success={isSuccess}
          />

          {PRODUCT_FORM_SECTIONS.map((Section, i) => (
            <Section key={i} />
          ))}

          <button
            disabled={!formState.isDirty || isSubmitting}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Save
          </button>
        </form>
      </ProductFormContext.Provider>
    </FormProvider>
  );
}
