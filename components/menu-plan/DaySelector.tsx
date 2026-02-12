"use client";

import { useState } from "react";
import { formatDateDDMMYY } from "@/lib/date/format";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

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
      <div className="flex gap-3 overflow-x-auto pb-2">
        {days.map((day, index) => {
          const isActive = day.menu_day_id === activeDayId;
          const date = new Date(day.date);

          return (
            <button
              key={day.menu_day_id}
              onClick={() => setActiveDayId(day.menu_day_id)}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-xs text-gray-500">{weekdays[index]}</span>

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border ${
                  isActive ? "bg-black text-white" : "bg-white text-gray-800"
                }`}
              >
                {date.getDate()}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border bg-white p-4 text-sm text-gray-600">
        Selected:{" "}
        {formatDateDDMMYY(
          days.find((d) => d.menu_day_id === activeDayId)?.date ?? "",
        )}
      </div>
    </div>
  );
}
