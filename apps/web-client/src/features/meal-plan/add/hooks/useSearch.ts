"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts, searchRecipes } from "@/shared/api/search/search.api";
import { TabType } from "../types/add-meal-plan.types";

type Params = {
  tab: TabType;
  query?: string;
};

export function useSearch({ tab, query }: Params) {
  return useQuery({
    queryKey: ["search", tab, query],

    queryFn: async () => {
      if (tab === "products") {
        return searchProducts(query);
      }

      // cookbook поки що теж recipes
      return searchRecipes(query);
    },

    enabled: !!tab, // safeguard
  });
}
