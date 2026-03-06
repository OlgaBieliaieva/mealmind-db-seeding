"use client";

// SECTION ███ PRODUCT BASIC SECTION ███

import { FieldErrors, UseFormRegister } from "react-hook-form";

import { ProductFormValues } from "../../../schemas/product-form.schema";

import { FormRenderer } from "@/domains/shared/components/form/FormRenderer";

import { PRODUCT_BASIC_FIELDS } from "../../../forms/productBasic.fields";

type Props = {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
};

export function ProductBasicSection({ register, errors }: Props) {
  return (
    <FormRenderer<ProductFormValues>
      fields={PRODUCT_BASIC_FIELDS}
      register={register}
      errors={errors}
    />
  );
}
