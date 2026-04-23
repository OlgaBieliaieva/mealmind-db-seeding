"use client";

import { DayPicker } from "react-day-picker";
import { uk } from "date-fns/locale";
import { formatLocalDate } from "@/shared/lib/formatLocalDate";
import "react-day-picker/dist/style.css";

type Props = {
  selectedDate: string;
  onSelect: (date: string) => void;
};

export default function DatePicker({ selectedDate, onSelect }: Props) {
  const selected = selectedDate
    ? new Date(selectedDate + "T00:00:00")
    : undefined;

  function handleSelect(date: Date | undefined) {
    if (!date) return;

    const iso = formatLocalDate(date);

    onSelect(iso);
  }

  return (
    <div className="border-t bg-gray-50 p-4">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        weekStartsOn={1}
        locale={uk}
      />
    </div>
  );
}
