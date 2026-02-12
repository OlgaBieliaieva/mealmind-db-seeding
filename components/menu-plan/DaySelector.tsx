"use client";

import { useState } from "react";

type Props = {
  days: {
    menu_day_id: string;
    date: string;
  }[];
};

export default function DaySelector({ days }: Props) {
  const [activeDayId, setActiveDayId] = useState(days[0]?.menu_day_id);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const isActive = day.menu_day_id === activeDayId;

          return (
            <button
              key={day.menu_day_id}
              onClick={() => setActiveDayId(day.menu_day_id)}
              className={`rounded-xl px-4 py-2 text-sm whitespace-nowrap border ${
                isActive ? "bg-black text-white" : "bg-white text-gray-700"
              }`}
            >
              {day.date}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
        Selected day: {days.find((d) => d.menu_day_id === activeDayId)?.date}
      </div>
    </div>
  );
}
