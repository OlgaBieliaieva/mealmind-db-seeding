"use client";

import { FormSection } from "@/domains/shared/components/form/FormSection";
import { PRODUCT_BASIC_FIELDS } from "../../../forms/productBasic.fields";
import { FormRenderer } from "@/domains/shared/components/form/FormRenderer";
import { ProductFormSection } from "@/domains/product/types/product-form-section.types";

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
