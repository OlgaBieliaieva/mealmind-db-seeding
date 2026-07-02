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
    <div className="flex justify-between gap-2">
      {days.map((day, index) => {
        const isActive = day === activeDate;
        const isSelected = selectedDays.includes(day);

        const selected = isMulti ? isSelected : isActive;

        const date = new Date(day);

        return (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={`flex flex-col items-center justify-center px-2 py-2 rounded-full text-sm transition
              ${
                selected ? "bg-black text-white" : "bg-gray-100 text-gray-600"
              }`}
          >
            <span className="text-xs opacity-70">{WEEK_DAYS_UA[index]}</span>

            <span className="text-sm font-medium">{date.getDate()}</span>
          </button>
        );
      })}
    </div>
  );
}
