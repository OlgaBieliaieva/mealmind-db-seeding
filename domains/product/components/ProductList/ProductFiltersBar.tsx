"use client";

import { useMemo } from "react";

import { useProductFilters } from "../../hooks/useProductFilters";
import { useBrands } from "../../hooks/useBrands";
import { useCategories } from "../../../../apps/web-admin/src/shared/hooks/useCategories";

import { PRODUCT_ADMIN_LABELS } from "../../constants/product.admin.labels";
import { PRODUCT_TYPE_OPTIONS } from "../../constants/product.ui.options";

import { buildCategoryTree } from "../../utils/buildCategoryTree";
import { mapCategoryTreeToOptions } from "../../adapters/category-options.adapter";
import { mapBrandsToOptions } from "../../adapters/brand-options.adapter";

import { ProductType } from "../../constants/product.constants";

export function ProductFiltersBar() {
  const { filters, updateFilters, isPending } = useProductFilters();

  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  /* ---------- category options ---------- */

  const categoryOptions = useMemo(() => {
    if (!categories) return [];

    const tree = buildCategoryTree(categories);

    return mapCategoryTreeToOptions(tree);
  }, [categories]);

  /* ---------- brand options ---------- */

  const brandOptions = useMemo(() => {
    if (!brands) return [];

    return mapBrandsToOptions(brands);
  }, [brands]);

  return (
    <div className="grid gap-3 md:grid-cols-4">
      {/* SEARCH */}

      <input
        value={filters.query ?? ""}
        onChange={(e) =>
          updateFilters({
            query: e.target.value || undefined,
          })
        }
        placeholder={PRODUCT_ADMIN_LABELS.searchPlaceholder}
        className="rounded border px-3 py-2"
      />

      {/* TYPE */}

      <select
        value={filters.type ?? ""}
        onChange={(e) =>
          updateFilters({
            type: e.target.value ? (e.target.value as ProductType) : undefined,
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

      {/* CATEGORY */}

      <select
        value={filters.categoryId ?? ""}
        onChange={(e) =>
          updateFilters({
            categoryId: e.target.value || undefined,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{PRODUCT_ADMIN_LABELS.filters.category}</option>

        {categoryOptions.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      {/* BRAND */}

      <select
        value={filters.brandId ?? ""}
        onChange={(e) =>
          updateFilters({
            brandId: e.target.value || undefined,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{PRODUCT_ADMIN_LABELS.filters.brand}</option>

        {brandOptions.map((b) => (
          <option key={b.id} value={b.id}>
            {b.label}
          </option>
        ))}
      </select>

      {isPending && (
        <div className="col-span-full text-xs text-gray-500">Оновлення…</div>
      )}
    </div>
  );
}
