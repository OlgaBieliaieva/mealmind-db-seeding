"use client";

import { useRouter } from "next/navigation";
import { usePlanParams } from "./usePlanParams";

export function useAddToPlanNavigation() {
  const router = useRouter();
  const { activeDate } = usePlanParams();

  return (mealTypeId?: string) => {
    const params = new URLSearchParams();

    params.set("date", activeDate);

    if (mealTypeId && mealTypeId !== "all") {
      params.set("mealTypeId", mealTypeId);
    }

    router.push(`/plan/add?${params.toString()}`);
  };
}
