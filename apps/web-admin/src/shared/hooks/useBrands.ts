"use client";

import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../api/brands/brands.api";

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
}
