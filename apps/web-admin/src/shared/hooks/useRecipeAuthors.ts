"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipeAuthors } from "../api/recipe-authors/recipe-authors.api";

export function useRecipeAuthors() {
  return useQuery({
    queryKey: ["recipe-authors"],
    queryFn: getRecipeAuthors,
  });
}
