"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  fullWeek: string[];
  activeDate: string;
  selectedDays: string[];
  isMulti: boolean;
};

export default function DaySelector({
  fullWeek,
  activeDate,
  selectedDays,
  isMulti,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(day: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!isMulti) {
      params.set("date", day);
      params.delete("days");
      router.replace(`?${params.toString()}`);
      return;
    }

    const current = params.get("days");
    let selected = current ? current.split(",") : [];

    if (selected.includes(day)) {
      selected = selected.filter((d) => d !== day);
    } else {
      selected.push(day);
    }

    if (selected.length === 0) {
      params.delete("days");
    } else {
      params.set("days", selected.sort().join(","));
    }

    router.replace(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      {fullWeek.map((day) => {
        const isActive = day === activeDate;
        const isSelected = selectedDays.includes(day);

        // 🔥 логіка стилів
        let dayClass = "bg-gray-100 text-gray-800";

        if (!isMulti && isActive) {
          dayClass = "bg-black text-white";
        }

        if (isMulti && isSelected) {
          dayClass = "bg-black text-white";
        }

        return (
          <button
            key={day}
            onClick={() => handleClick(day)}
            className="flex flex-col items-center"
          >
            <div
              className={`
                w-10 h-10
                flex items-center justify-center
                rounded-full
                transition-colors
                ${dayClass}
              `}
            >
              {new Date(day + "T00:00:00").getDate()}
            </div>
          </button>
        );
      })}
    </div>
  );
}
