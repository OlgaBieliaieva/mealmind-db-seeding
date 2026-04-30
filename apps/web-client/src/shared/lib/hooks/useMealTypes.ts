import { useQuery } from "@tanstack/react-query";
import { getMealTypes } from "@/shared/api/meal-type/meal-type.api";

export function useMealTypes() {
  return useQuery({
    queryKey: ["meal-types"],
    queryFn: getMealTypes,
  });
}
