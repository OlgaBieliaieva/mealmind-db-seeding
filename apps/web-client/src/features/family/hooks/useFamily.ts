"use client";

import { useQuery } from "@tanstack/react-query";
import { getFamily } from "@/shared/api/family/family.api";

export function useFamily() {
  return useQuery({
    queryKey: ["family"],
    queryFn: getFamily,
  });
}
