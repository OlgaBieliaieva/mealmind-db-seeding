"use client";

// SECTION ███ PRODUCT CATEGORY SECTION ███
// WHY: category + subcategory selection for product form

import { useMemo } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

import { useCategories } from "@/domains/product/hooks/useCategories";
import { buildCategoryTree } from "@/domains/product/utils/buildCategoryTree";

import { PRODUCT_LABELS } from "@/domains/product/constants/product.labels";

import { ProductFormValues } from "../../../schemas/product-form.schema";

type Props = {
  register: UseFormRegister<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
};

export function ProductCategorySection({ register, watch }: Props) {
  const { data: categories, isLoading } = useCategories();

  // build category tree only when data changes
  const tree = useMemo(() => {
    if (!categories) return [];
    return buildCategoryTree(categories);
  }, [categories]);

  // selected category id from form
  const categoryId = watch("category_id");

  // find selected category node
  const selectedCategory = useMemo(
    () => tree.find((c) => c.id === categoryId),
    [tree, categoryId],
  );

  // safe subcategories list
  const subcategories = selectedCategory?.children ?? [];

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading categories...</p>;
  }

  return (
    <div className="space-y-4">
      {/* CATEGORY */}

      <div>
        <label className="text-sm font-medium">{PRODUCT_LABELS.CATEGORY}</label>

        <select
          {...register("category_id")}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="">Select category</option>

          {tree.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name.ua}
            </option>
          ))}
        </select>
      </div>

      {/* SUBCATEGORY */}

      {subcategories.length > 0 && (
        <div>
          <label className="text-sm font-medium">
            {PRODUCT_LABELS.SUBCATEGORY}
          </label>

          <select
            {...register("subcategory_id")}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option value="">Select subcategory</option>

            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name.ua}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
