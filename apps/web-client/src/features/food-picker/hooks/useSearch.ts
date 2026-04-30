"use client";

import { useQuery } from "@tanstack/react-query";
import {
  searchProducts,
  searchRecipes,
  searchCookbook,
} from "@/shared/api/search/search.api";
import { TabType } from "../../meal-plan/add/types/add-meal-plan.types";

type Params = {
  tab: TabType;
  query?: string;
  page: number;
};

export function useSearch({ tab, query, page }: Params) {
  return useQuery({
    queryKey: ["search", tab, query, page],

    queryFn: async () => {
      switch (tab) {
        case "products":
          return searchProducts(query, page);

        case "cookbook":
          return searchCookbook(query, page);

        case "recipes":
        default:
          return searchRecipes(query, page);
      }
    },

    placeholderData: (prev) => prev,
  });
}
