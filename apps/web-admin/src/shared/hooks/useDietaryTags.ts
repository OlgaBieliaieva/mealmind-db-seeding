"use client";

import { useQuery } from "@tanstack/react-query";
import { getDietaryTags } from "@/shared/api/dietary-tags/dietary-tags.api";

export function useDietaryTags() {
  return useQuery({
    queryKey: ["dietary-tags"],
    queryFn: getDietaryTags,
  });
}
