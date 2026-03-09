"use client";

// SECTION ███ BRANDS QUERY HOOK ███

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/api";

import { Brand } from "../types/brand.types";

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],

    queryFn: () => apiFetch<Brand[]>("/api/v2/brands"),
  });
}
