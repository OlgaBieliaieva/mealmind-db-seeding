"use client";

import { useFormContext } from "react-hook-form";

import { FormSection } from "@/shared/ui/form/FormSection";
import { GenericProductSearch } from "@/features/generic-product/components/GenericProductSearch";
import { useGenericInheritance } from "../../../hooks/useGenericInheritance";
import { useProductFormUI } from "../../../forms/product-form.context";
import { ProductFormValues } from "../../../schemas/product-form.schema";
import { GenericProduct } from "@/features/generic-product/types/generic-product.types";

export function ProductParentSection() {
  const { setParentLocked, parentLocked } = useProductFormUI();
  const { watch } = useFormContext<ProductFormValues>();

  const type = watch("type");
  const parentId = watch("parent_product_id");

  const { applyInheritance, clearInheritance } = useGenericInheritance();

  if (type !== "branded") return null;

  function handleSelect(product: GenericProduct | null) {
    if (!product) {
      clearInheritance();
      setParentLocked(false);
      return;
    }

    applyInheritance(product);
    setParentLocked(true);
  }

  return (
    <FormSection
      title="Базовий продукт"
      description="Можна наслідувати параметри від generic продукту"
    >
      <GenericProductSearch
        valueId={parentId}
        disabled={parentLocked}
        onSelect={handleSelect}
      />
    </FormSection>
  );
}
