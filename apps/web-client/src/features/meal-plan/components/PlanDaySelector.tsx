"use client";

type Props = {
  days: string[];
  activeDate: string;
  selectedDays: string[];
  isMulti: boolean;
  onSelect: (day: string) => void;
};

const WEEK_DAYS_UA = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export default function PlanDaySelector({
  days,
  activeDate,
  selectedDays,
  isMulti,
  onSelect,
}: Props) {
  return (
    <div className="flex justify-between">
      {days.map((day, index) => {
        const isActive = day === activeDate;
        const isSelected = selectedDays.includes(day);

        let cls = "bg-gray-100 text-gray-700";

        if (!isMulti && isActive) {
          cls = "bg-black text-white";
        }

        if (isMulti && isSelected) {
          cls = "bg-black text-white";
        }

        const date = new Date(day);

        return (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className="flex flex-col items-center gap-1"
          >
            {/* Day of week */}
            <span className="text-xs text-gray-400">{WEEK_DAYS_UA[index]}</span>

            {/* Date */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${cls}`}
            >
              {date.getDate()}
            </div>
          </button>
        );
      })}
    </div>
  );
}
