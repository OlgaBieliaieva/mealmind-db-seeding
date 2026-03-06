"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "./DatePicker";
import PlanDaySelector from "./PlanDaySelector";
import { formatDateDDMMYY } from "@/lib/v1/date/format";

type Props = {
  familyName: string;
  fullWeek: string[];
  activeDate: string;
  selectedDays: string[];
};

export default function PlanHeader({
  familyName,
  fullWeek,
  activeDate,
  selectedDays,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMulti = searchParams.get("days") !== null;

  if (!fullWeek || fullWeek.length === 0) {
    return null;
  }

  const weekLabel = `${formatDateDDMMYY(fullWeek[0])} — ${formatDateDDMMYY(
    fullWeek[6],
  )}`;

  function goToToday() {
    const today = new Date().toISOString().split("T")[0];

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", today);
    params.delete("days");

    router.replace(`?${params.toString()}`);
  }
  function toggleMulti(enabled: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (!enabled) {
      params.delete("days");
    } else {
      params.set("days", activeDate);
    }

    router.replace(`?${params.toString()}`);
  }
  return (
    <div className="bg-white border-b">
      {/* Top row */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div>
          <div className="text-lg font-semibold text-gray-900">
            {familyName}
          </div>
          <div className="text-sm text-gray-400">{weekLabel}</div>
        </div>

        {/* Right controls */}
        <div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 text-xl">🔔</button>

            {/* Calendar toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="text-gray-500 text-xl"
            >
              📅
            </button>
          </div>

          {/* Today button */}
          <button
            onClick={goToToday}
            className="text-sm text-gray-400"
            // className="text-sm px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Сьогодні
          </button>
        </div>
      </div>

      {/* Day selector */}
      <div className="px-4 pb-3">
        <PlanDaySelector
          fullWeek={fullWeek}
          activeDate={activeDate}
          selectedDays={selectedDays}
          isMulti={isMulti}
        />
      </div>

      <div className="px-4 pb-2">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isMulti}
            onChange={(e) => toggleMulti(e.target.checked)}
          />
          Обрати кілька днів
        </label>
      </div>

      {isOpen && (
        <DatePicker activeDate={activeDate} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
