"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type ViewMode = "meal" | "user";

export function usePlanParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const today = new Date().toISOString().split("T")[0];

  const dateParam = searchParams.get("date");
  const daysParam = searchParams.get("days");
  const modeParam = searchParams.get("mode");
  const viewParam = searchParams.get("view");

  const activeDate = dateParam ?? today;

  const selectedDays = daysParam
    ? daysParam.split(",").filter(Boolean).sort()
    : [activeDate];

  const isMulti = modeParam === "multi";

  // 🔥 NEW
  const viewMode: ViewMode = viewParam === "user" ? "user" : "meal";

  function update(params: URLSearchParams) {
    router.replace(`?${params.toString()}`);
  }

  // =========================
  // DATE
  // =========================

  function setDate(nextDate: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("date", nextDate);
    params.delete("days");

    update(params);
  }

  // =========================
  // DAY SELECT
  // =========================

  function toggleDay(day: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!isMulti) {
      params.set("date", day);
      params.delete("days");

      update(params);
      return;
    }

    const current = params.get("days");
    let selected = current ? current.split(",") : [activeDate];

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

    update(params);
  }

  // =========================
  // MULTI MODE
  // =========================

  function toggleMulti(enabled: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (!enabled) {
      params.delete("mode");
      params.delete("days");
    } else {
      params.set("mode", "multi");

      if (!params.get("days")) {
        params.set("days", activeDate);
      }
    }

    update(params);
  }

  // =========================
  // VIEW MODE 🔥
  // =========================

  function setViewMode(mode: ViewMode) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("view", mode);

    update(params);
  }

  function goToToday() {
    setDate(today);
  }

  return {
    activeDate,
    selectedDays,
    isMulti,
    viewMode,

    setDate,
    toggleDay,
    toggleMulti,
    setViewMode,
    goToToday,
  };
}
