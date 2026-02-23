"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DaySelector from "./DaySelector";
import { formatDateDDMMYY } from "@/lib/date/format";

type Props = {
  familyName: string;
  fullWeek: string[];
  activeDate: string;
};

export default function PlanHeader({
  familyName,
  fullWeek,
  activeDate,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 text-xl">🔔</button>

          <button onClick={goToToday} className="text-gray-500 text-xl">
            📅
          </button>
        </div>
      </div>

      {/* Day selector */}
      <div className="px-4 pb-3">
        <DaySelector fullWeek={fullWeek} activeDate={activeDate} />
      </div>
    </div>
  );
}
