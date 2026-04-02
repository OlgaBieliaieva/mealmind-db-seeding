"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { ProductFormInput } from "../schemas/product-form.schema";

export function useProductFormPermissions(mode: "create" | "edit") {
  const { watch } = useFormContext<ProductFormInput>();

  const parentId = watch("parent_product_id");

  const isEdit = mode === "edit";
  const hasParent = !!parentId;

  // control unlock
  const [isParentEditable, setIsParentEditable] = useState(false);

  return {
    isEdit,
    hasParent,

    isParentEditable,
    setIsParentEditable,

    // rules
    canEditType: !isEdit, 

    canEditParent: !isEdit || isParentEditable,

    canEditCategory: !(isEdit && hasParent && !isParentEditable),

    canEditCooking: !(isEdit && hasParent && !isParentEditable),
    canEditEdible: !(isEdit && hasParent && !isParentEditable),
    canEditYield: !(isEdit && hasParent && !isParentEditable),
  };
}