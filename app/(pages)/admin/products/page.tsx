"use client";

import Link from "next/link";
import { useProductList } from "@/domains/product/hooks/useProductList";
import { useProductFilters } from "@/domains/product/hooks/useProductFilters";
import { ProductFiltersBar } from "@/domains/product/components/ProductList/ProductFiltersBar";
import { Pagination } from "@/domains/shared/components/table/Pagination";
import { PRODUCT_ADMIN_LABELS } from "@/domains/product/constants/product.admin.labels";

export default function ProductListPage() {
  const { data, isLoading, isFetching } = useProductList();
  const { filters, updateFilters, isPending } = useProductFilters();

  const page = filters.page ?? 1;
  const totalPages = data?.total ?? 1;

  return (
    <div className="space-y-6">
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

      {isLoading && <p className="text-sm text-gray-500">Завантаження…</p>}

      {data && data.items.length === 0 && (
        <div className="rounded border bg-white p-6 text-center">
          <p className="font-medium">{PRODUCT_ADMIN_LABELS.empty.title}</p>

          <p className="text-sm text-gray-500">
            {PRODUCT_ADMIN_LABELS.empty.description}
          </p>
        </div>
      )}

      {data && data.items.length > 0 && (
        <div className="rounded border bg-white">
          {data.items.map((p) => (
            <div
              key={p.product_id}
              className="flex items-center justify-between border-b px-4 py-3 last:border-b-0"
            >
              <div>
                <div className="font-medium">{p.name_ua}</div>

                <div className="text-xs text-gray-500">{p.type}</div>
              </div>

              <div className="text-sm text-gray-500">{p.brand ?? "—"}</div>
            </div>
          ))}
        </div>
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
    </div>
  );
}
