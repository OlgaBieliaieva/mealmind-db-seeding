"use client";

import { useQuery } from "@tanstack/react-query";
import { getCuisines } from "@/shared/api/cuisines/cuisines.api";

export function useCuisines() {
  return useQuery({
    queryKey: ["cuisines"],
    queryFn: getCuisines,
  });
}
