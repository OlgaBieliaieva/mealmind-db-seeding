"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { RecipeCreateInput } from "../../schemas/recipe.create.schema";
import { useRecipeCalculations } from "../../hooks/useRecipeCalculations";
import { useNutrientReferences } from "@/shared/hooks/useNutrientReferences";

import { RecipeMacrosBlock } from "../nutrients/MacrosBlock";
import { RecipeNutrientsTable } from "../nutrients/RecipeNutrientsTable";

export function RecipeNutritionPreviewSection() {
  const { watch } = useFormContext<RecipeCreateInput>();

  const values = watch();

  const { data: nutrientRefs = [] } = useNutrientReferences();

  const { nutrientRows, effectiveOutputWeight } = useRecipeCalculations(
    values,
    nutrientRefs,
  );

  const servings = values.recipe.base_servings || 1;

  const [expanded, setExpanded] = useState(false);

  if (nutrientRows.length === 0) return null;

  return (
    <div className="space-y-4 border rounded p-4 bg-gray-50">
      <h2 className="font-medium">Харчова цінність</h2>

      {/* META */}
      <div className="text-sm text-gray-500 space-y-1">
        <div>
          Вихід:{" "}
          <span className="font-medium">
            {effectiveOutputWeight.toFixed(0)} г
          </span>
        </div>

        <div>
          Порцій: <span className="font-medium">{servings}</span>
        </div>
      </div>

      {/* MACROS */}
      <RecipeMacrosBlock rows={nutrientRows} />

      {/* TOGGLE */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="text-sm text-blue-500"
      >
        {expanded ? "Сховати всі нутрієнти" : "Показати всі нутрієнти"}
      </button>

      {/* FULL */}
      {expanded && <RecipeNutrientsTable rows={nutrientRows} />}
    </div>
  );
}
