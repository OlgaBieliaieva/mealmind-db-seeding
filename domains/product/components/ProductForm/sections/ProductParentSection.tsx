"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { FormSection } from "@/domains/shared/components/form/FormSection";
import { GenericProductSearch } from "@/domains/product/components/GenericProductSearch";

import { useGenericInheritance } from "@/domains/product/hooks/useGenericInheritance";
import { useProductFormUI } from "@/domains/product/forms/product-form.context";

import { ProductFormValues } from "@/domains/product/schemas/product-form.schema";
import { GenericProduct } from "@/domains/product/types/generic-product.types";

export function ProductParentSection() {
  const { setParentLocked } = useProductFormUI();
  const { watch } = useFormContext<ProductFormValues>();

  const type = watch("type");

  const [selectedParent, setSelectedParent] = useState<GenericProduct | null>(
    null,
  );

  const { applyInheritance, clearInheritance } = useGenericInheritance();

  if (type !== "branded") return null;

  function handleSelect(product: GenericProduct | null) {
    setSelectedParent(product);

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
      <GenericProductSearch value={selectedParent} onSelect={handleSelect} />
    </FormSection>
  );
}
