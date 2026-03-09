"use client";

// SECTION ███ CATEGORIES QUERY ███

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/api";

import { Category } from "@/domains/shared/types/category.types";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],

    queryFn: () => apiFetch<Category[]>("/api/v2/categories"),
  });
}
