"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { FormSection } from "@/shared/ui/form/FormSection";
import { GenericProductSearch } from "@/features/generic-product/components/GenericProductSearch";
import { useGenericProductById } from "@/features/generic-product/hooks/useGenericProductById";
import { useGenericInheritance } from "../../../hooks/useGenericInheritance";
import { useProductFormUI } from "../../../forms/product-form.context";
import { useProductFormPermissions } from "@/features/product-form/hooks/useProductFormPermissions";
import { ProductFormInput } from "../../../schemas/product-form.schema";

export function ProductParentSection() {
  const {
    setParentLocked,
    parentLocked,
    mode,
    allowParentEdit,
    setAllowParentEdit,
  } = useProductFormUI();
  const { watch, setValue } = useFormContext<ProductFormInput>();

  const type = watch("type");
  const parentId = watch("parent_product_id");
  const { data: parentProduct } = useGenericProductById(parentId);

  const { applyInheritance, clearInheritance } = useGenericInheritance();
  const { canEditParent } = useProductFormPermissions(mode);

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
    if (mode === "edit" && !allowParentEdit) return;
    setParentLocked(true);
  }

  return (
    <FormSection
      title="Базовий продукт"
      description="Можна наслідувати параметри від generic продукту"
    >
      <GenericProductSearch
        valueId={parentId}
        disabled={mode === "edit" && !allowParentEdit}
        onSelect={handleSelect}
      />

      {mode === "edit" && parentId && (
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={allowParentEdit}
            onChange={(e) => {
              const checked = e.target.checked;

              setAllowParentEdit(checked);

              if (!checked) {
                setParentLocked(true);
              }
            }}
          />

          <span className="text-sm">Змінити базовий продукт</span>
        </div>
      )}

      {allowParentEdit && (
        <p className="text-xs text-orange-500 mb-2">
          ⚠️ Зміна базового продукту оновить категорію та коефіцієнти
        </p>
      )}
    </FormSection>
  );
}
