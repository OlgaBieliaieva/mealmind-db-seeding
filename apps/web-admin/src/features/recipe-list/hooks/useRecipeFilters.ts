"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";

export type RecipeFilters = {
  query?: string;
  recipe_type_id?: string;
  cuisine_id?: string;
  dietary_tag_id?: string;
  status?: string;
  page?: number;
};

export function useRecipeFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const filters: RecipeFilters = useMemo(() => {
    return {
      query: params.get("query") ?? undefined,
      recipe_type_id: params.get("recipe_type_id") ?? undefined,
      cuisine_id: params.get("cuisine_id") ?? undefined,
      dietary_tag_id: params.get("dietary_tag_id") ?? undefined,
      status: params.get("status") ?? undefined,
      page: params.get("page") ? Number(params.get("page")) : 1,
    };
  }, [params]);

  function updateFilters(next: Partial<RecipeFilters>) {
    startTransition(() => {
      const newParams = new URLSearchParams(params.toString());

      Object.entries(next).forEach(([key, value]) => {
        if (!value) newParams.delete(key);
        else newParams.set(key, String(value));
      });

      // reset pagination при зміні фільтрів
      if (
        next.query !== undefined ||
        next.recipe_type_id !== undefined ||
        next.cuisine_id !== undefined ||
        next.dietary_tag_id !== undefined ||
        next.status !== undefined
      ) {
        newParams.delete("page");
      }

      router.push(`/admin/recipes?${newParams.toString()}`);
    });
  }

  return {
    filters,
    updateFilters,
    isPending,
  };
}