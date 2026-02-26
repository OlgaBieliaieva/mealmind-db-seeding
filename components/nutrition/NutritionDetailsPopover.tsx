"use client";

import { useState } from "react";
import { BalanceResult } from "@/types/nutrition-balance";
import { NutritionDisplayItem } from "@/lib/nutrition/nutrition.adapter";
import MacroDonutChart from "./MacroDonutChart";
import NutrientDetailsList from "./NutrientDetailsList";

type Props = {
  nutrition: NutritionDisplayItem[];
  balance: BalanceResult;
  targets: Record<string, number>;
  periodDays: number;
  trigger: React.ReactNode;
};

export default function NutritionDetailsPopover({
  nutrition,
  balance,
  targets,
  periodDays,
  trigger,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] max-h-[85vh] overflow-y-auto rounded-xl p-6 shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Деталі харчування ({periodDays} дн.)
            </h2>

            {/* 🔥 Donut chart */}
            <MacroDonutChart balance={balance} />

            {/* 🔥 Nutrients list */}
            <NutrientDetailsList
              nutrition={nutrition}
              targets={targets}
              highlighted={balance.highlightedNutrients}
              periodDays={periodDays}
            />
          </div>
        </div>
      )}
    </>
  );
}
