"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import {
  PRODUCT_TYPES,
  ProductType,
} from "@/shared/domain/constants/product.constants";

export type ProductFilters = {
  query?: string;
  type?: "generic" | "branded";
  categoryId?: string;
  brandId?: string;
  page?: number;
};

export function useProductFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function parseType(value: string | null): ProductType | undefined {
    if (!value) return undefined;

    if (value === PRODUCT_TYPES.GENERIC) return value;
    if (value === PRODUCT_TYPES.BRANDED) return value;

    return undefined;
  }

  const filters: ProductFilters = useMemo(() => {
    return {
      query: params.get("query") ?? undefined,
      type: parseType(params.get("type")),
      categoryId: params.get("categoryId") ?? undefined,
      brandId: params.get("brandId") ?? undefined,
      page: params.get("page") ? Number(params.get("page")) : 1,
    };
  }, [params]);

  function updateFilters(next: Partial<ProductFilters>) {
    startTransition(() => {
      const newParams = new URLSearchParams(params.toString());

      Object.entries(next).forEach(([key, value]) => {
        if (!value) newParams.delete(key);
        else newParams.set(key, String(value));
      });

      if (
        next.query !== undefined ||
        next.type !== undefined ||
        next.categoryId !== undefined ||
        next.brandId !== undefined
      ) {
        newParams.delete("page");
      }

      router.push(`/admin/products?${newParams.toString()}`);
    });
  }

  return {
    filters,
    updateFilters,
    isPending,
  };
}
