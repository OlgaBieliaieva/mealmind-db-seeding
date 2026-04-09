"use client";

import { useProductList } from "@/features/product-list/hooks/useProductList";
import { ProductList } from "@/features/product-list/components/ProductList";
import { useRouter } from "next/navigation";
import {
  getSelectedProducts,
  toggleSelectedProduct,
  SelectedProductsMap,
} from "@/shared/lib/selection/recipe-selection";
import { ProductListItemDto } from "@/shared/api/products/products.types";
import { useState } from "react";
import { ProductFiltersBar } from "@/features/product-list/components/ProductFiltersBar";
import { useProductFilters } from "@/features/product-list/hooks/useProductFilters";
import { TableCardSkeleton } from "@/shared/ui/table/TableCardSkeleton";
import { Pagination } from "@/shared/ui/table/Pagination";
import { ProductListEmpty } from "@/features/product-list/components/ProductListEmpty";

export default function ProductSelectPage() {
  const { data, isLoading, isFetching } = useProductList();
  const { filters, updateFilters, isPending } = useProductFilters();

  const page = filters.page ?? 1;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;
  const router = useRouter();

  const [selectedMap, setSelectedMap] = useState<SelectedProductsMap>(() =>
    getSelectedProducts(),
  );

  function toggle(product: ProductListItemDto) {
    toggleSelectedProduct(product);
    setSelectedMap(getSelectedProducts());
  }

  function handleConfirm() {
    router.push("/admin/recipes/new?fromSelect=1");
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

      {/* {data && (
        <ProductList
          items={data.items}
          mode="select"
          selectedIds={Object.keys(selectedMap)}
          onToggleSelect={toggle}
        />
      )} */}

      <button
        onClick={handleConfirm}
        className="w-full rounded bg-black text-white py-3"
      >
        Додати ({Object.keys(selectedMap).length})
      </button>
    </div>
  );
}
