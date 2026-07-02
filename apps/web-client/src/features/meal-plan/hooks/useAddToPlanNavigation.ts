"use client";

import { useRouter } from "next/navigation";
import { usePlanParams } from "./usePlanParams";

type Input = {
  mealTypeId?: string;
  memberId?: string;
};

export function useAddToPlanNavigation() {
  const router = useRouter();
  const { activeDate } = usePlanParams();

  return (input?: Input) => {
    const params = new URLSearchParams();

    params.set("date", activeDate);

    if (input?.mealTypeId && input.mealTypeId !== "all") {
      params.set("mealTypeId", input.mealTypeId);
    }

    router.push(`/plan/add?${params.toString()}`);
  };
}
