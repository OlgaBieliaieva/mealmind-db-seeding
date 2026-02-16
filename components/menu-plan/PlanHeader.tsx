"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getWeekRange, formatDDMMYY } from "./WeekUtils";

type Props = {
  familyName: string;
};

export default function PlanHeader({ familyName }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDate =
    searchParams.get("date") ?? new Date().toISOString().split("T")[0];

  const { start, end } = getWeekRange(selectedDate);

  const weekLabel = `${formatDDMMYY(start)} — ${formatDDMMYY(end)}`;

  return (
    <div className="sticky top-0 z-20 bg-white border-b">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div>
          <div className="text-lg font-semibold text-gray-900">
            {familyName}
          </div>
          <div className="text-sm text-gray-400">{weekLabel}</div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Notifications placeholder */}
          <button className="text-gray-500 text-xl">🔔</button>

          {/* Calendar placeholder */}
          <button
            onClick={() => {
              const today = new Date().toISOString().split("T")[0];
              router.push(`?date=${today}`);
            }}
            className="text-gray-500 text-xl"
          >
            📅
          </button>
        </div>
      </div>
    </div>
  );
}
