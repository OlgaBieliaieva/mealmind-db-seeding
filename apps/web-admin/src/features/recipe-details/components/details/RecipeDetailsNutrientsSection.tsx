"use client";

import { useMemo, useState } from "react";
import { DetailsSectionCard } from "@/features/product-details/components/details/DetailsSectionCard";
import { RecipeDetailsVM } from "@/features/recipe/types/recipe-details.vm";
import { useNutrientReferences } from "@/shared/hooks/useNutrientReferences";

import { mapRecipeNutrientsToRows } from "@/features/recipe/adapters/recipe-nutrients.adapter";

import { getMacroRows } from "@/features/recipe/adapters/recipe-macros.adapter";

import { RecipeMacrosBlock } from "@/features/recipe-form/components/nutrients/MacrosBlock";
import { RecipeNutrientsTable } from "@/features/recipe-form/components/nutrients/RecipeNutrientsTable";

type Props = {
  recipe: RecipeDetailsVM;
};

export function RecipeDetailsNutrientsSection({ recipe }: Props) {
  const { data: refs } = useNutrientReferences();
  const [expanded, setExpanded] = useState(false);

  const rows = useMemo(() => {
    return refs ? mapRecipeNutrientsToRows(recipe, refs) : [];
  }, [recipe, refs]);

  const macros = useMemo(() => getMacroRows(rows), [rows]);

  if (!rows.length) return null;

  return (
    <DetailsSectionCard title="Поживна цінність">
      <div className="space-y-4">
        {/* 🔥 MACROS (always visible) */}
        <RecipeMacrosBlock rows={macros} />

        {/* 🔽 TOGGLE */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm text-blue-600 hover:underline"
        >
          {expanded ? "Сховати всі нутрієнти" : "Показати всі нутрієнти"}
        </button>

        {/* 🔥 TABLE */}
        {expanded && (
          <div className="pt-2">
            <RecipeNutrientsTable rows={rows} />
          </div>
        )}
      </div>
    </DetailsSectionCard>
  );
}
