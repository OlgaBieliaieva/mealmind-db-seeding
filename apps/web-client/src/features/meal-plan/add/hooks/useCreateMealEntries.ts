"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMealEntries } from "@/shared/api/meal-plan/meal-plan.api";

export function useCreateMealEntries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMealEntries,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meal-plan"],
      });
    },
  });
}
