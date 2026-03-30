"use client";

import Link from "next/link";

import { useProductList } from "@/features/product-list/hooks/useProductList";
import { useProductFilters } from "@/features/product-list/hooks/useProductFilters";

import { TableCardSkeleton } from "@/shared/ui/table/TableCardSkeleton";
import { Pagination } from "@/shared/ui/table/Pagination";

import { ProductFiltersBar } from "@/features/product-list/components/ProductFiltersBar";

import { ProductListEmpty } from "@/features/product-list/components/ProductListEmpty";
import { ProductList } from "@/features/product-list/components/ProductList";

import { PRODUCT_ADMIN_LABELS } from "@/features/product/constants/product.admin.labels";

export default function ProductListPage() {
  const { data, isLoading, isFetching } = useProductList();
  const { filters, updateFilters, isPending } = useProductFilters();

  const page = filters.page ?? 1;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{PRODUCT_ADMIN_LABELS.title}</h1>

        <Link
          href="/admin/products/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          {PRODUCT_ADMIN_LABELS.createButton}
        </Link>
      </div>

      {/* FILTER */}
      <ProductFiltersBar />

      {/* LIST */}

      {isLoading && <TableCardSkeleton />}

      {isFetching && !isLoading && (
        <div className="text-xs text-gray-400">Оновлення…</div>
      )}

      {data && data.items.length === 0 && <ProductListEmpty />}

      {data && data.items.length > 0 && <ProductList items={data.items} />}

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
    </div>
  );
}
