"use client";

import { useMemo } from "react";

import { useRecipeFilters } from "../hooks/useRecipeFilters";
import { useRecipeTypes } from "@/shared/hooks/useRecipeTypes";
import { useCuisines } from "@/shared/hooks/useCuisines";
import { useDietaryTags } from "@/shared/hooks/useDietaryTags";
import { useRecipeAuthors } from "@/shared/hooks/useRecipeAuthors";
import {
  mapRecipeTypesToOptions,
  mapCuisinesToOptions,
  mapDietaryTagsToOptions,
  mapRecipeAuthorsToOptions,
} from "../adapters/recipe-options.adapter";

import { RECIPE_ADMIN_LABELS } from "../constants/recipe.admin.labels";

export function RecipeFiltersBar() {
  const { filters, updateFilters, isPending } = useRecipeFilters();

  const { data: recipeTypes } = useRecipeTypes();
  const { data: cuisines } = useCuisines();
  const { data: dietaryTags } = useDietaryTags();
  const { data: authors } = useRecipeAuthors();

  // ===== OPTIONS =====

  const typeOptions = useMemo(() => {
    return recipeTypes ? mapRecipeTypesToOptions(recipeTypes) : [];
  }, [recipeTypes]);

  const cuisineOptions = useMemo(() => {
    return cuisines ? mapCuisinesToOptions(cuisines) : [];
  }, [cuisines]);

  const dietaryOptions = useMemo(() => {
    return dietaryTags ? mapDietaryTagsToOptions(dietaryTags) : [];
  }, [dietaryTags]);

  const authorOptions = useMemo(() => {
    return authors ? mapRecipeAuthorsToOptions(authors) : [];
  }, [authors]);

  return (
    <div className="flex flex-col gap-3 ">
      {/* SEARCH */}
      <input
        value={filters.query ?? ""}
        onChange={(e) =>
          updateFilters({
            query: e.target.value || undefined,
          })
        }
        placeholder={RECIPE_ADMIN_LABELS.filters.searchPlaceholder}
        className="rounded border px-3 py-2"
      />

      {/* TYPE */}
      <select
        value={filters.recipe_type_id ?? ""}
        onChange={(e) =>
          updateFilters({
            recipe_type_id: e.target.value || undefined,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{RECIPE_ADMIN_LABELS.filters.type}</option>

        {typeOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* CUISINE */}
      <select
        value={filters.cuisine_id ?? ""}
        onChange={(e) =>
          updateFilters({
            cuisine_id: e.target.value || undefined,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{RECIPE_ADMIN_LABELS.filters.cuisine}</option>

        {cuisineOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* DIETARY */}
      <select
        value={filters.dietary_tag_id ?? ""}
        onChange={(e) =>
          updateFilters({
            dietary_tag_id: e.target.value || undefined,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{RECIPE_ADMIN_LABELS.filters.dietary}</option>

        {dietaryOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* STATUS */}
      <select
        value={filters.status ?? ""}
        onChange={(e) =>
          updateFilters({
            status: e.target.value || undefined,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{RECIPE_ADMIN_LABELS.filters.status}</option>

        <option value="draft">Чернетка</option>
        <option value="ready">Готовий</option>
        <option value="published">Опубліковано</option>
        <option value="archived">Архів</option>
      </select>

      {/* AUTHOR */}
      <select
        value={filters.author_id ?? ""}
        onChange={(e) =>
          updateFilters({
            author_id: e.target.value || undefined,
          })
        }
        className="rounded border px-3 py-2"
      >
        <option value="">{RECIPE_ADMIN_LABELS.filters.author}</option>

        {authorOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

      {isPending && (
        <div className="col-span-full text-xs text-gray-500">Оновлення…</div>
      )}
    </div>
  );
}
