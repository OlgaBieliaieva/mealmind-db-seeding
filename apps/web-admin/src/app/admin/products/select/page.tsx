"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useProductList } from "@/features/product-list/hooks/useProductList";
import { useProductFilters } from "@/features/product-list/hooks/useProductFilters";

import { ProductList } from "@/features/product-list/components/ProductList";
import { ProductFiltersBar } from "@/features/product-list/components/ProductFiltersBar";
import { ProductListEmpty } from "@/features/product-list/components/ProductListEmpty";

import { TableCardSkeleton } from "@/shared/ui/table/TableCardSkeleton";
import { Pagination } from "@/shared/ui/table/Pagination";

import { ProductListItemDto } from "@/shared/api/products/products.types";

import {
  getRecipeDraft,
  setRecipeDraft,
} from "@/shared/lib/recipe/recipe-draft";

import {
  toggleSelection,
  getSelection,
  SelectedProduct,
} from "@/shared/lib/selection/recipe-selection";

import { RecipeCreateInput } from "@/features/recipe-form/schemas/recipe.create.schema";

type Draft = RecipeCreateInput & {
  selection?: Record<string, SelectedProduct>;
};

export default function ProductSelectPage() {
  const { data, isLoading, isFetching } = useProductList();
  const { filters, updateFilters, isPending } = useProductFilters();

  const router = useRouter();

  const page = filters.page ?? 1;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  
  const [selectedMap, setSelectedMap] = useState<
    Record<string, SelectedProduct>
  >(() => getSelection());

  function toggle(product: ProductListItemDto) {
    toggleSelection({
      product_id: product.product_id,
      name: product.name_ua,
      brand: product.brand,
      unit: product.unit || "g",
      quantity_g: 100,
    });

    setSelectedMap(getSelection());
  }

  function handleConfirm() {
    const draft: Draft = getRecipeDraft<Draft>() || {
      recipe: {
        title: "",
        description: "",
        output_weight_mode: "auto",
        base_servings: 1,
        base_output_weight_g: 0,
        container_weight_g: 0,
      },
      ingredients: [],
      steps: [],
      cuisine_ids: [],
      dietary_tag_ids: [],
      selection: {},
    };

    const selectionMap = draft.selection || {};
    const selected: SelectedProduct[] = Object.values(selectionMap);

    const existingIds = new Set(draft.ingredients.map((i) => i.product_id));

    const newItems = selected.filter((p) => !existingIds.has(p.product_id));

    const merged = [
      ...draft.ingredients,
      ...newItems.map((p, index) => ({
        product_id: p.product_id,
        quantity_g: p.quantity_g,
        product_name: p.name,
        product_brand: p.brand,
        product_unit: p.unit,
        is_optional: false,
        order_index: draft.ingredients.length + index + 1,
      })),
    ];

    setRecipeDraft({
      ...draft,
      ingredients: merged,
      selection: {},
    });

    router.push("/admin/recipes/new");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Обрати інгредієнти</h1>

      {/* FILTER */}
      <ProductFiltersBar />

      {/* LIST */}
      {isLoading && <TableCardSkeleton />}

      {isFetching && !isLoading && (
        <div className="text-xs text-gray-400">Оновлення…</div>
      )}

      {data && data.items.length === 0 && <ProductListEmpty />}

      {data && data.items.length > 0 && (
        <ProductList
          items={data.items}
          mode="select"
          selectedIds={Object.keys(selectedMap)}
          onToggleSelect={toggle}
        />
      )}

      {/* PAGINATION */}
      {data && (
        <Pagination
          page={page}
          totalPages={totalPages}
          isPending={isFetching || isPending}
          onChange={(p) =>
            updateFilters({
              page: p,
            })
          }
        />
      )}

      {/* CONFIRM */}
      <button
        onClick={handleConfirm}
        disabled={Object.keys(selectedMap).length === 0}
        className="w-full rounded bg-black text-white py-3 disabled:opacity-50"
      >
        Додати ({Object.keys(selectedMap).length})
      </button>
    </div>
  );
}
