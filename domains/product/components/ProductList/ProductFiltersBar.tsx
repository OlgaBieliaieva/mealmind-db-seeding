"use client";

import { useProductFilters } from "../../hooks/useProductFilters";
import { PRODUCT_ADMIN_LABELS } from "../../constants/product.admin.labels";
import { PRODUCT_TYPE_OPTIONS } from "../../constants/product.constants";
import { ProductType } from "../../constants/product.constants";

export function ProductFiltersBar() {
  const { filters, updateFilters, isPending } = useProductFilters();

  return (
    <div className="grid gap-3 md:grid-cols-4">
      {/* SEARCH */}
      <input
        value={filters.query ?? ""}
        onChange={(e) => updateFilters({ query: e.target.value })}
        placeholder={PRODUCT_ADMIN_LABELS.searchPlaceholder}
        className="rounded border px-3 py-2"
      />

      {/* TYPE */}
      <select
        value={filters.type ?? ""}
        onChange={(e) =>
          updateFilters({
            type: e.target.value as ProductType,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{PRODUCT_ADMIN_LABELS.filters.allTypes}</option>

        {PRODUCT_TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* category filter placeholder */}
      <select disabled className="rounded border px-3 py-2 opacity-60">
        <option>{PRODUCT_ADMIN_LABELS.filters.categorySoon}</option>
      </select>

      {/* brand filter placeholder */}
      <select disabled className="rounded border px-3 py-2 opacity-60">
        <option>{PRODUCT_ADMIN_LABELS.filters.brandSoon}</option>
      </select>

      {isPending && (
        <div className="text-xs text-gray-500 col-span-full">Loading…</div>
      )}
    </div>
  );
}
