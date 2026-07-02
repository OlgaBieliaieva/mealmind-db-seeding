"use client";

import { useRouter } from "next/navigation";
import { usePlanParams } from "./usePlanParams";

type Input = {
  memberId: string;
  mealTypeId: string;
  recipeId?: string;
  productId?: string;
  amountG?: number;
};

export function useOpenAdvancedMealPlanEditor() {
  const router = useRouter();
  const { activeDate, selectedDays } = usePlanParams();

  return ({ memberId, mealTypeId, recipeId, productId, amountG }: Input) => {
    const params = new URLSearchParams();

    params.set("date", activeDate);
    params.set("days", selectedDays.join(","));
    params.set("userId", memberId);
    params.set("mealTypeId", mealTypeId);

    if (recipeId) params.set("recipeId", recipeId);
    if (productId) params.set("productId", productId);
    if (amountG) params.set("amountG", String(amountG));

    router.push(`/plan/add/advanced?${params.toString()}`);
  };
}
