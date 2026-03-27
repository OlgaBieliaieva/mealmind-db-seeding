"use client";

import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { useCategories } from "@/src/shared/hooks/useCategories";
import { useProductFormUI } from "../../../forms/product-form.context";
import { buildCategoryTree } from "@/src/shared/lib/category/buildCategoryTree";
import { FormSection } from "@/src/shared/ui/form/FormSection";

import { ProductFormValues } from "../../../schemas/product-form.schema";

export function ProductCategorySection() {
  const { parentLocked } = useProductFormUI();
  const { register, setValue } = useFormContext<ProductFormValues>();

  const leafId = useWatch<ProductFormValues>({
    name: "category_id",
  });

  const { data: categories, isLoading } = useCategories();

  const tree = useMemo(() => {
    if (!categories) return [];
    return buildCategoryTree(categories);
  }, [categories]);

  // ⭐ NEW SMART ROOT DETECTION
  const rootId = useMemo(() => {
    if (!leafId) return undefined;

    for (const root of tree) {
      if (root.children.some((c) => c.id === leafId)) {
        return root.id;
      }
    }

    const rootNode = tree.find((r) => r.id === leafId);
    if (rootNode) return rootNode.id;

    return undefined;
  }, [tree, leafId]);

  const subcategories = useMemo(() => {
    if (!rootId) return [];

    const rootNode = tree.find((r) => r.id === rootId);
    return rootNode?.children ?? [];
  }, [tree, rootId]);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Завантажуємо категорії...</p>;
  }

  return (
    <FormSection title="Категорія" description="Вкажіть групу продукту">
      <div className="space-y-4">
        {/* ROOT */}
        <select
          disabled={parentLocked}
          value={rootId ?? ""}
          onChange={(e) => {
            const newRoot = e.target.value || undefined;

            if (!newRoot) {
              setValue("category_id", "");
              return;
            }

            const rootNode = tree.find((r) => r.id === newRoot);

            const firstLeaf = rootNode?.children?.[0]?.id;

            setValue("category_id", firstLeaf ?? newRoot);
          }}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Оберіть категорію</option>

          {tree.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name.ua}
            </option>
          ))}
        </select>

        {/* LEAF */}
        {subcategories.length > 0 && (
          <select
            disabled={parentLocked}
            {...register("category_id")}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Оберіть підкатегорію</option>

            {subcategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name.ua}
              </option>
            ))}
          </select>
        )}
      </div>
    </FormSection>
  );
}
