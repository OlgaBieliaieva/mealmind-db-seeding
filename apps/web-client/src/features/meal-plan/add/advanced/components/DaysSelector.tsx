"use client";

import {
  generateWeek,
  getWeekStart,
} from "@/features/meal-plan/shared/lib/date";

type Props = {
  baseDate: string;
  selectedDays: string[];
  onChange: (days: string[]) => void;
};

const WEEK_DAYS_UA = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export function DaysSelector({ baseDate, selectedDays, onChange }: Props) {
  const weekStart = getWeekStart(baseDate);
  const days = generateWeek(weekStart);

  function toggle(day: string) {
    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter((d) => d !== day));
    } else {
      onChange([...selectedDays, day].sort());
    }
  }

  return (
    <div className="bg-white p-4 rounded-2xl space-y-3">
      {/* TITLE */}
      <div className="text-sm text-gray-500">Дні</div>

      {/* DAYS */}
      <div className="flex justify-between gap-2">
        {days.map((day, index) => {
          const isSelected = selectedDays.includes(day);
          const date = new Date(day);

          return (
            <button
              key={day}
              onClick={() => toggle(day)}
              className={`flex flex-col items-center justify-center px-2 py-2 rounded-full text-sm transition active:scale-[0.95]
                ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
              <span className="text-xs opacity-70">{WEEK_DAYS_UA[index]}</span>

              <span className="text-sm font-medium">{date.getDate()}</span>
            </button>
          );
        })}
      </div>

      {selectedDays.length > 1 && (
        <div className="text-xs text-gray-500">
          Обрано {selectedDays.length} днів
        </div>
      )}
    </div>
  );
}
