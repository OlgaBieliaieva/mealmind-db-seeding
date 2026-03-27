"use client";

import { FormSection } from "@/src/shared/ui/form/FormSection";
import { PRODUCT_BASIC_FIELDS } from "../../../forms/productBasic.fields";
import { FormRenderer } from "@/src/shared/ui/form/FormRenderer";
import { ProductFormSection } from "../../../types/product-form-section.types";

export function ProductBasicSection<ProductFormSection>() {
  return (
    <FormSection
      title="Основна інформація"
      description="Назва, тип та одиниця виміру"
    >
      <FormRenderer fields={PRODUCT_BASIC_FIELDS} />
    </FormSection>
  );
}
