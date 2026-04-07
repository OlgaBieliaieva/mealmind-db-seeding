"use client";

import Link from "next/link";

import { useRecipeList } from "@/features/recipe-list/hooks/useRecipeList";
import { useRecipeFilters } from "@/features/recipe-list/hooks/useRecipeFilters";

import { TableCardSkeleton } from "@/shared/ui/table/TableCardSkeleton";
import { Pagination } from "@/shared/ui/table/Pagination";

import { RecipeFiltersBar } from "@/features/recipe-list/components/RecipeFiltersBar";
import { RecipeList } from "@/features/recipe-list/components/RecipeList";
import { RecipeListEmpty } from "@/features/recipe-list/components/RecipeListEmpty";

import { RECIPE_ADMIN_LABELS } from "@/features/recipe-list/constants/recipe.admin.labels";

export default function RecipeListPage() {
  const { data, isLoading, isFetching } = useRecipeList();
  const { filters, updateFilters, isPending } = useRecipeFilters();

  const page = filters.page ?? 1;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{RECIPE_ADMIN_LABELS.title}</h1>

        <Link
          href="/admin/recipes/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          {RECIPE_ADMIN_LABELS.createButton}
        </Link>
      </div>

      {/* FILTER */}
      <RecipeFiltersBar />

      {/* LIST */}

      {isLoading && <TableCardSkeleton />}

      {isFetching && !isLoading && (
        <div className="text-xs text-gray-400">Оновлення…</div>
      )}

      {data && data.items.length === 0 && <RecipeListEmpty />}

      {data && data.items.length > 0 && <RecipeList items={data.items} />}

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
