"use client";

import { useRouter } from "next/navigation";
import { MenuEntry } from "@/types/menu-entry";
import { NutritionDisplayItem } from "@/lib/v1/nutrition/nutrition.adapter";

type Props = {
  planId: string;
  entry: MenuEntry;
  name: string;
  amountLabel: string;
  nutrition?: NutritionDisplayItem[];
};

export default function DishBlock({
  planId,
  entry,
  name,
  amountLabel,
  nutrition,
}: Props) {
  const router = useRouter();

  const getMacro = (code: string) =>
    nutrition?.find((n) => n.code === code)?.value ?? 0;

  const protein = getMacro("protein");
  const fat = getMacro("fat");
  const carbs = getMacro("carbohydrates");
  const energy = getMacro("energy_kcal");

  const handleClick = () => {
    router.push(`/plan/${planId}/entry/edit/${entry.menu_entry_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col text-sm text-gray-700 gap-1 border-t cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        <span>{entry.entry_type === "recipe" ? "🍳" : "🛒"}</span>

        <span className="flex-1">{name}</span>

        <span className="text-gray-400">{amountLabel}</span>
      </div>

      {nutrition && (
        <div className="text-xs text-gray-500 pl-6 flex items-center gap-3">
          {energy > 0 && <span>{Math.round(energy)} kcal</span>}
          <span>
            🥩 {protein.toFixed(1)}g · 🧈 {fat.toFixed(1)}g · 🍞{" "}
            {carbs.toFixed(1)}g
          </span>
        </div>
      )}
    </div>
  );
}
