import { AggregatedMealViewDTO } from "@/shared/types/meal-plan.types";

export function getMealTabs(aggregated: AggregatedMealViewDTO) {
  return aggregated.tabs.map((tab) => ({
    id: tab.id,
    name: tab.name,
  }));
}

export function getMealActiveView(
  aggregated: AggregatedMealViewDTO,
  activeMealType: string,
) {
  return activeMealType === "all"
    ? aggregated.all
    : aggregated.byMealType.find(
        (group) => group.mealType.id === activeMealType,
      );
}
