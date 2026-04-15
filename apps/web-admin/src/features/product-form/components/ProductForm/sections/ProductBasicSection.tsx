"use client";

import { FormSection } from "@/shared/ui/form/FormSection";
import { FormRenderer } from "@/shared/ui/form/FormRenderer";
import { ProductFormInput } from "../../../schemas/product-form.schema";

import { getProductBasicFields } from "../../../forms/productBasic.fields";
import { useProductFormUI } from "../../../forms/product-form.context";
import { useProductFormPermissions } from "@/features/product-form/hooks/useProductFormPermissions";

export function ProductBasicSection() {
  const { mode } = useProductFormUI();
  const { canEditType } = useProductFormPermissions(mode);

  const fields = getProductBasicFields(canEditType);

  return (
    <FormSection
      title="Основна інформація"
      description="Назва, тип та одиниця виміру"
    >
      <FormRenderer fields={fields} />
    </FormSection>
  );
}
