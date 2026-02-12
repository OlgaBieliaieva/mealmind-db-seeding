"use client";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

type Props = {
  fullWeek: string[];
  planDaysMap: Map<string, string>;
  activeDate: string;
  onDayChange: (date: string) => void;
};

export default function DaySelector({
  fullWeek,
  planDaysMap,
  activeDate,
  onDayChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {fullWeek.map((dateString, index) => {
          const isInPlan = planDaysMap.has(dateString);
          const isActive = activeDate === dateString;

          const date = new Date(dateString);

          return (
            <button
              key={dateString}
              disabled={!isInPlan}
              onClick={() => {
                if (isInPlan) onDayChange(dateString);
              }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className={`text-xs ${
                  isInPlan ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {weekdays[index]}
              </span>

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border ${
                  !isInPlan
                    ? "bg-gray-100 text-gray-300 border-gray-200"
                    : isActive
                      ? "bg-black text-white"
                      : "bg-white text-gray-800"
                }`}
              >
                {date.getDate()}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
