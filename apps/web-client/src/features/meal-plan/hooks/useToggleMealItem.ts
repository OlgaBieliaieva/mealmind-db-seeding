import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleMealItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      await fetch("/api/meal-plan/entries/toggle-bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["meal-plan"] });
    },
  });
}