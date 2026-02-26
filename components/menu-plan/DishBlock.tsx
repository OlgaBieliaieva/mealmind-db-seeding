"use client";

import { MenuEntry } from "@/types/menu-entry";
import { NutritionDisplayItem } from "@/lib/nutrition/nutrition.adapter";

type Props = {
  entry: MenuEntry;
  name: string;
  amountLabel: string;
  nutrition?: NutritionDisplayItem[];
};

export default function DishBlock({
  entry,
  name,
  amountLabel,
  nutrition,
}: Props) {
  const getMacro = (code: string) =>
    nutrition?.find((n) => n.code === code)?.value ?? 0;

  const protein = getMacro("protein");
  const fat = getMacro("fat");
  const carbs = getMacro("carbohydrates");

  return (
    <div className="flex flex-col text-sm text-gray-700 gap-1 border-t">
      <div className="flex items-center gap-2">
        <span>{entry.entry_type === "recipe" ? "🍳" : "🛒"}</span>

        <span className="flex-1">{name}</span>

        <span className="text-gray-400">{amountLabel}</span>
      </div>

      {/* Dish macro snapshot in grams */}
      {nutrition && (
        <div className="text-xs text-gray-500 pl-6">
          🥩 {protein.toFixed(1)}g · 🧈 {fat.toFixed(1)}g · 🍞{" "}
          {carbs.toFixed(1)}g
        </div>
      )}
    </div>
  );
}
