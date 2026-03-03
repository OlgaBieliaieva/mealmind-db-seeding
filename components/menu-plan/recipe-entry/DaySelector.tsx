"use client";

type Props = {
  fullWeek: string[];
  selectedDays: string[];
  onChange: (days: string[]) => void;
  mode?: "single" | "multi";
};

export default function DaySelector({
  fullWeek,
  selectedDays,
  onChange,
  mode = "single",
}: Props) {
  function handleClick(day: string) {
    if (mode === "single") {
      onChange([day]);
      return;
    }

    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter((d) => d !== day));
    } else {
      onChange([...selectedDays, day].sort());
    }
  }

  return (
    <div className="flex gap-3">
      {fullWeek.map((day) => {
        const isSelected = selectedDays.includes(day);

        const dateObj = new Date(day + "T00:00:00");
        const dayNumber = dateObj.getDate();

        const weekDayLabel = dateObj.toLocaleDateString("uk-UA", {
          weekday: "short",
        });

        return (
          <button
            key={day}
            type="button"
            onClick={() => handleClick(day)}
            className="flex flex-col items-center group"
          >
            {/* Day circle */}
            <div
              className={`
                w-11 h-11
                flex items-center justify-center
                rounded-full
                text-sm font-medium
                transition-all
                ${
                  isSelected
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                }
              `}
            >
              {dayNumber}
            </div>

            {/* Weekday label */}
            <span className="text-[10px] text-gray-400 mt-1">
              {weekDayLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
