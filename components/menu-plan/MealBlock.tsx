"use client";

import { useState } from "react";
import { MenuEntry } from "@/types/menu-entry";
import { NutritionDisplayItem } from "@/lib/v1/nutrition/nutrition.adapter";
import MacroSnapshot from "../nutrition/MacroSnapshot";
import DishBlock from "./DishBlock";

type Props = {
  planId: string;
  title: string;
  entries: MenuEntry[];
  recipesMap: Record<string, string>;
  productsMap: Record<string, string>;
  recipeWeightMap: Record<string, number>;
  productUnitMap: Record<string, string>;
  macro?: {
    energy: number;
    proteinPercent: number;
    fatPercent: number;
    carbsPercent: number;
  };
  dishNutritionMap: Record<string, NutritionDisplayItem[]>;
  onAdd?: () => void;
};

export default function MealBlock({
  planId,
  title,
  entries,
  recipesMap,
  productsMap,
  productUnitMap,
  macro,
  dishNutritionMap,
  onAdd,
}: Props) {
  const [open, setOpen] = useState(false);

  const hasEntries = entries.length > 0;

  return (
    <div className="border-t">
      {/* HEADER */}
      <div className="w-full flex justify-between items-center py-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 text-left"
        >
          <span className="text-sm font-medium text-gray-700">{title}</span>

          {hasEntries && (
            <span className="text-xs text-gray-400">{entries.length}</span>
          )}

          <span className="text-gray-400 text-sm">{open ? "▴" : "▾"}</span>
        </button>

        {onAdd && (
          <button
            onClick={onAdd}
            className="text-sm text-purple-600 font-medium"
          >
            +
          </button>
        )}
      </div>

      {/* MACRO SNAPSHOT */}
      {macro && macro.energy > 0 && (
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs text-gray-500">
            {Math.round(macro.energy)} kcal
          </span>

          <MacroSnapshot
            protein={macro.proteinPercent}
            fat={macro.fatPercent}
            carbs={macro.carbsPercent}
          />
        </div>
      )}

      {/* CONTENT */}

      {open && (
        <div className="pb-3 space-y-3">
          {!hasEntries ? (
            <div className="text-sm text-gray-400">No meals added yet</div>
          ) : (
            entries.map((entry) => {
              const displayName =
                entry.entry_type === "recipe"
                  ? recipesMap[entry.entry_id]
                  : productsMap[entry.entry_id];

              let amountLabel = "";

              if (entry.entry_type === "recipe") {
                const plannedWeight = entry.planned_weight_g ?? 0;

                // const baseWeight = recipeWeightMap[entry.entry_id] ?? 0;

                const portionInfo = "";

                // if (baseWeight > 0) {
                //   const ratio = plannedWeight / baseWeight;

                //   // якщо хочеш показувати частку базового рецепта
                //   portionInfo =
                //     ratio >= 1
                //       ? `${ratio.toFixed(2)}× базовий рецепт`
                //       : `${(ratio * 100).toFixed(0)}% рецепта`;
                // }

                amountLabel = `${Math.round(plannedWeight)} g
                ${portionInfo ? ` · ${portionInfo}` : ""}
                `;
              }

              if (entry.entry_type === "product") {
                const unit = productUnitMap[entry.entry_id] ?? "г";

                amountLabel = `${entry.quantity_g} ${unit}`;
              }

              return (
                <DishBlock
                  key={entry.menu_entry_id}
                  planId={planId}
                  entry={entry}
                  name={displayName ?? entry.entry_id}
                  amountLabel={amountLabel}
                  nutrition={dishNutritionMap[entry.menu_entry_id]}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
