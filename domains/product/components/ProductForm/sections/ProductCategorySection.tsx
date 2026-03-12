"use client";

// SECTION ███ PRODUCT CATEGORY SECTION ███
// RHF-driven leaf category selector with derived root

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { useCategories } from "@/domains/product/hooks/useCategories";
import { buildCategoryTree } from "@/domains/product/utils/buildCategoryTree";
import { FormSection } from "@/domains/shared/components/form/FormSection";

import { PRODUCT_LABELS } from "@/domains/product/constants/product.labels";
import { ProductFormValues } from "../../../schemas/product-form.schema";

export function ProductCategorySection() {
  const { register, watch, setValue } = useFormContext<ProductFormValues>();

  const { data: categories, isLoading } = useCategories();

  const tree = useMemo(() => {
    if (!categories) return [];
    return buildCategoryTree(categories);
  }, [categories]);

  // ⭐ SINGLE SOURCE OF TRUTH
  const leafId = watch("category_id");

  // ⭐ derive root from leaf
  const rootId = useMemo(() => {
    if (!leafId) return undefined;

    for (const root of tree) {
      if (root.children.some((c) => c.id === leafId)) {
        return root.id;
      }
    }

    return undefined;
  }, [tree, leafId]);

  const selectedRoot = useMemo(
    () => tree.find((c) => c.id === rootId),
    [tree, rootId],
  );

  const subcategories = selectedRoot?.children ?? [];

  if (isLoading) {
    return <p className="text-sm text-gray-500">Завантажуємо категорії...</p>;
  }

  return (
    <FormSection title="Категорія" description="Вкажіть групу продукту">
      <div className="space-y-4">
        {/* ROOT CATEGORY */}

        <div>
          <label className="text-sm font-medium">
            {PRODUCT_LABELS.CATEGORY}
          </label>

          {/* <select
            value={rootId ?? ""}
            onChange={() => {
              // ⭐ root changed → reset leaf
              setValue("category_id", undefined, {
                shouldDirty: true,
                shouldValidate: true,
              }); */}
          <select
            value={rootId ?? ""}
            onChange={(e) => {
              const newRoot = e.target.value || undefined;

              if (!newRoot) {
                setValue("category_id", undefined);
                return;
              }

              const rootNode = tree.find((r) => r.id === newRoot);

              const firstLeaf = rootNode?.children?.[0]?.id;

              setValue("category_id", firstLeaf);
            }}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option value="">Оберіть категорію</option>

            {tree.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name.ua}
              </option>
            ))}
          </select>
        </div>

        {/* LEAF CATEGORY */}

        {subcategories.length > 0 && (
          <div>
            <label className="text-sm font-medium">
              {PRODUCT_LABELS.SUBCATEGORY}
            </label>

            <select
              {...register("category_id")}
              className="mt-1 w-full rounded border px-3 py-2"
            >
              <option value="">Оберіть підкатегорію</option>

              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name.ua}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </FormSection>
  );
}
