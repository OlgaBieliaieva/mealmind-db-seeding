"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { FormSection } from "@/shared/ui/form/FormSection";
import { GenericProductSearch } from "@/features/generic-product/components/GenericProductSearch";
import { useGenericProductById } from "@/features/generic-product/hooks/useGenericProductById";
import { useGenericInheritance } from "../../../hooks/useGenericInheritance";
import { useProductFormUI } from "../../../forms/product-form.context";
import { ProductFormInput } from "../../../schemas/product-form.schema";

export function ProductParentSection() {
  const { setParentLocked, parentLocked } = useProductFormUI();
  const { watch, setValue } = useFormContext<ProductFormInput>();

  const type = watch("type");
  const parentId = watch("parent_product_id");
  const { data: parentProduct } = useGenericProductById(parentId);

  const { applyInheritance, clearInheritance } = useGenericInheritance();

  useEffect(() => {
    if (!parentProduct) return;

    applyInheritance(parentProduct);
  }, [parentProduct]);

  if (type !== "branded") return null;

  function handleSelect(productId: string | null) {
    if (!productId) {
      clearInheritance();
      setParentLocked(false);
      return;
    }

    setValue("parent_product_id", productId);
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
