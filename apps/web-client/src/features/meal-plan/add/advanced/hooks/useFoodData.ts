"use client";

import { useQueryClient } from "@tanstack/react-query";

import { useRecipeDetails } from "@/features/recipe-details/hooks/useRecipeDetails";
import { useProductDetails } from "@/features/product-details/hooks/useProductDetails";

import { RecipeDetailsDTO } from "@/features/recipe-details/types/recipe-details.types";
import { ProductDetailsDTO } from "@/features/product-details/types/product-details.types";

type FoodData = {
  type: "recipe" | "product";
  name: string;
  photoUrl?: string;
  categoryName?: string;
  categoryCode?: string;
  macros?: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
};

export function useFoodData(
  recipeId?: string | null,
  productId?: string | null,
) {
  const queryClient = useQueryClient();

  // =========================
  // CACHE
  // =========================

  const cachedRecipe = recipeId
    ? (queryClient.getQueryData(["recipe", recipeId]) as
        | RecipeDetailsDTO
        | undefined)
    : undefined;

  const cachedProduct = productId
    ? (queryClient.getQueryData(["product", productId]) as
        | ProductDetailsDTO
        | undefined)
    : undefined;

  // =========================
  // FETCH (fallback)
  // =========================

  const { data: recipe } = useRecipeDetails(recipeId ?? undefined, {
    enabled: !!recipeId && !cachedRecipe,
  });

  const { data: product } = useProductDetails(productId ?? undefined, {
    enabled: !!productId && !cachedProduct,
  });

  // =========================
  // FINAL DATA
  // =========================

  const finalRecipe = cachedRecipe ?? recipe;
  const finalProduct = cachedProduct ?? product;

  if (finalRecipe) {
    return {
      data: {
        type: "recipe",
        name: finalRecipe.name,
        photoUrl: finalRecipe.photoUrl,
        categoryName: finalRecipe.categoryName,
        categoryCode: finalRecipe.categoryCode,
        macros: finalRecipe.macros,
      } as FoodData,
    };
  }

  if (finalProduct) {
    return {
      data: {
        type: "product",
        name: finalProduct.name,
        photoUrl: finalProduct.photoUrl,
        categoryName: finalProduct.categoryName,
        categoryCode: finalProduct.categoryCode,
        macros: finalProduct.macros,
      } as FoodData,
    };
  }

  return { data: undefined };
}