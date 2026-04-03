"use client";

import { useFormContext } from "react-hook-form";
import { ProductFormInput } from "../schemas/product-form.schema";
import { GenericProduct } from "../../generic-product/types/generic-product.types";

export function useGenericInheritance() {
  const { setValue } = useFormContext<ProductFormInput>();

  function applyInheritance(product: GenericProduct) {
    setValue("parent_product_id", product.product_id);

    if (product.category_id) {
      setValue("category_id", product.category_id, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    if (product.cooking_loss_pct !== undefined) {
      setValue("cooking_loss_pct", String(product.cooking_loss_pct), {
        shouldDirty: true,
      });
    }

    if (product.edible_part_pct !== undefined) {
      setValue("edible_part_pct", String(product.edible_part_pct), {
        shouldDirty: true,
      });
    }

    if (product.yield_factor !== undefined) {
      setValue("yield_factor", String(product.yield_factor), {
        shouldDirty: true,
      });
    }
  }

  function clearInheritance() {
    setValue("parent_product_id", undefined);

    setValue("category_id", "", {
      shouldDirty: false,
      shouldValidate: true,
    });

    setValue("cooking_loss_pct", "", { shouldDirty: true });
    setValue("edible_part_pct", "", { shouldDirty: true });
    setValue("yield_factor", "", { shouldDirty: true });
  }

  return {
    applyInheritance,
    clearInheritance,
  };
}
