"use client";

import { useMemo } from "react";
import { RecipeCreateInput } from "../schemas/recipe.create.schema";
import { useProductsNutrients } from "@/shared/hooks/useProductNutrients";
import { aggregateRecipeNutrients } from "@/shared/lib/recipe/aggregateRecipeNutrients";
import { NutrientReference } from "@/shared/domain/nutrition/nutrient.types";

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function useRecipeCalculations(
  values: RecipeCreateInput,
  nutrientRefs: NutrientReference[],
) {
  const ingredients = values.ingredients;
  const recipe = values.recipe;

  const isManual = recipe.output_weight_mode === "manual";

  // =============================
  // IDS
  // =============================

  const productIds = useMemo(
    () => ingredients.map((i) => i.product_id).filter(isNotNull) as string[],
    [ingredients],
  );

  // =============================
  // DATA
  // =============================

  const { data: productNutrientsMap = {} } = useProductsNutrients(productIds);

  // =============================
  // WEIGHT
  // =============================

  const calculatedWeight = useMemo(
    () => ingredients.reduce((sum, i) => sum + (i.quantity_g || 0), 0),
    [ingredients],
  );

  const effectiveOutputWeight = useMemo(() => {
    const base = isManual
      ? Number(recipe.base_output_weight_g || 0)
      : calculatedWeight;

    const container = Number(recipe.container_weight_g || 0);

    if (container > 0) {
      return Math.max(base - container, 0);
    }

    return base;
  }, [
    isManual,
    recipe.base_output_weight_g,
    recipe.container_weight_g,
    calculatedWeight,
  ]);

  // =============================
  // AGGREGATE
  // =============================

  const nutrients = useMemo(() => {
    return aggregateRecipeNutrients(
      ingredients
        .filter((i) => i.product_id)
        .map((i) => ({
          product_id: i.product_id!,
          quantity_g: i.quantity_g,
        })),
      productNutrientsMap,
    );
  }, [ingredients, productNutrientsMap]);

  // =============================
  // ROWS
  // =============================

  const nutrientRows = useMemo(() => {
    if (!nutrients || !nutrientRefs) return [];

    return nutrientRefs
      .map((ref) => {
        const n = nutrients[ref.nutrient_id];
        if (!n) return null;

        const total = n.value;

        const per100g =
          effectiveOutputWeight > 0 ? (total / effectiveOutputWeight) * 100 : 0;

        const perServing =
          recipe.base_servings > 0 ? total / recipe.base_servings : 0;

        return {
          id: ref.nutrient_id,
          code: ref.code,
          label: ref.name.ua,
          unit: n.unit,
          total,
          per100g,
          perServing,
        };
      })
      .filter(isNotNull);
  }, [nutrients, nutrientRefs, effectiveOutputWeight, recipe.base_servings]);

  return {
    calculatedWeight,
    effectiveOutputWeight,
    nutrients,
    nutrientRows,
    isManual,
  };
}
