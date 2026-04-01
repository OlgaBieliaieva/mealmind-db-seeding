"use client";

import { FormSection } from "@/shared/ui/form/FormSection";
import { PRODUCT_BASIC_FIELDS } from "../../../forms/productBasic.fields";
import { FormRenderer } from "@/shared/ui/form/FormRenderer";
import { ProductFormInput } from "../../../schemas/product-form.schema";

export function ProductBasicSection() {
  return (
    <FormSection
      title="Основна інформація"
      description="Назва, тип та одиниця виміру"
    >
      <FormRenderer<ProductFormInput> fields={PRODUCT_BASIC_FIELDS} />
    </FormSection>
  );
}
