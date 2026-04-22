"use client";

import { useState } from "react";
import { usePlanParams } from "../hooks/usePlanParams";
import { useFamily } from "@/features/family/hooks/useFamily";
import { getWeekStart, generateWeek, formatWeekLabel } from "../lib/date";
import PlanDaySelector from "./PlanDaySelector";

export default function PlanHeader() {
  const {
    activeDate,
    selectedDays,
    isMulti,
    toggleDay,
    toggleMulti,
    goToToday,
  } = usePlanParams();

  const [isOpen, setIsOpen] = useState(false);
  const { data } = useFamily();

  const weekStart = getWeekStart(activeDate);
  const fullWeek = generateWeek(weekStart);
  const weekLabel = formatWeekLabel(fullWeek);

  return (
    <div className="bg-white border-b">
      {/* ROW 1 */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold text-gray-900">
            {data?.name ?? "…"}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-xl">🔔</button>

          <button onClick={() => setIsOpen((v) => !v)} className="text-xl">
            📅
          </button>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="px-4 pb-2 flex justify-between items-center">
        <div className="text-sm text-gray-400">{weekLabel}</div>

        <button onClick={goToToday} className="text-sm text-gray-400">
          Сьогодні
        </button>
      </div>

      {/* ROW 3 */}
      <div className="px-4 pb-3">
        <PlanDaySelector
          days={fullWeek}
          activeDate={activeDate}
          selectedDays={selectedDays}
          isMulti={isMulti}
          onSelect={toggleDay}
        />
      </div>

      {/* ROW 4 */}
      <div className="px-4 pb-3">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isMulti}
            onChange={(e) => toggleMulti(e.target.checked)}
          />
          Обрати кілька днів
        </label>
      </div>

      {/* CALENDAR (placeholder) */}
      {isOpen && (
        <div className="p-4 border-t text-sm text-gray-400">
          Calendar coming next...
        </div>
      )}
    </div>
  );
}
