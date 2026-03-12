"use client";

import { FormSection } from "@/domains/shared/components/form/FormSection";
import { PRODUCT_BASIC_FIELDS } from "../../../forms/productBasic.fields";
import { FormRenderer } from "@/domains/shared/components/form/FormRenderer";

export function ProductBasicSection() {
  return (
    <FormSection
      title="Основна інформація"
      description="Назва, тип та одиниця виміру"
    >
      <FormRenderer fields={PRODUCT_BASIC_FIELDS} />
    </FormSection>
  );
}
