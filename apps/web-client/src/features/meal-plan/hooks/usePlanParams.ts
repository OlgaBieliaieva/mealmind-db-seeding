"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function usePlanParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const daysParam = searchParams.get("days");

  const today = new Date().toISOString().split("T")[0];

  const activeDate = date ?? today;

  const selectedDays = daysParam ? daysParam.split(",").sort() : [activeDate];

  const isMulti = !!daysParam;

  function setDate(nextDate: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", nextDate);
    params.delete("days");

    router.replace(`?${params.toString()}`);
  }

  function toggleDay(day: string) {
    const params = new URLSearchParams(searchParams.toString());

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

  function toggleMulti(enabled: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (!enabled) {
      params.delete("days");
    } else {
      params.set("days", activeDate);
    }

    router.replace(`?${params.toString()}`);
  }

  function goToToday() {
    setDate(today);
  }

  return {
    activeDate,
    selectedDays,
    isMulti,
    setDate,
    toggleDay,
    toggleMulti,
    goToToday,
  };
}
