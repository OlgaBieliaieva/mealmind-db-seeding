"use client";

import { DayPicker } from "react-day-picker";
import { uk } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { formatLocalDate } from "@/lib/date/format";
import "react-day-picker/dist/style.css";

type Props = {
  activeDate: string;
  onClose: () => void;
};

export default function DatePicker({ activeDate, onClose }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDate = activeDate
    ? new Date(activeDate + "T00:00:00")
    : undefined;

  function handleSelect(date: Date | undefined) {
    if (!date) return;

    const iso = formatLocalDate(date);

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", iso);
    params.delete("days");

    router.replace(`?${params.toString()}`);
    onClose();
  }

  return (
    <div className="border-t bg-gray-50 p-4">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        weekStartsOn={1}
        locale={uk}
      />
    </div>
  );
}
