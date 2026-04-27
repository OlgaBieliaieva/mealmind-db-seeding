import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleMealEntries } from "@/shared/api/meal-plan/meal-plan.api";

export function useToggleMealItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => toggleMealEntries(ids),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["meal-plan"] });
    },
  });
}
