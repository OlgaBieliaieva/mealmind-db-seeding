"use client";

import { useFormContext } from "react-hook-form";

import { ProductFormValues } from "../schemas/product-form.schema";
import { GenericProduct } from "../types/generic-product.types";

export function useGenericInheritance() {
  const { setValue } = useFormContext<ProductFormValues>();

  function applyInheritance(product: GenericProduct) {
    setValue("parent_product_id", product.product_id);

    if (product.category_id) {
      setValue("category_id", product.category_id, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    if (product.cooking_loss_pct !== undefined) {
      setValue("cooking_loss_pct", product.cooking_loss_pct);
    }

    if (product.edible_part_pct !== undefined) {
      setValue("edible_part_pct", product.edible_part_pct);
    }

    if (product.yield_factor !== undefined) {
      setValue("yield_factor", product.yield_factor);
    }
  }

  function clearInheritance() {
    setValue("parent_product_id", undefined);

    setValue("category_id", undefined, {
      shouldDirty: false,
      shouldValidate: true,
    });

    setValue("cooking_loss_pct", undefined);
    setValue("edible_part_pct", undefined);
    setValue("yield_factor", undefined);
  }

  return {
    applyInheritance,
    clearInheritance,
  };
}
