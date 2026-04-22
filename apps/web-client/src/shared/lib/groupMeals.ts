import { MealDTO } from "../types/meal-plan.types";

export function groupMeals(meals: MealDTO[]): MealDTO[] {
  const map = new Map<string, MealDTO>();

  for (const meal of meals) {
    const existing = map.get(meal.mealTypeId);

    if (!existing) {
      map.set(meal.mealTypeId, {
        mealTypeId: meal.mealTypeId,
        mealTypeName: meal.mealTypeName,
        entries: [...meal.entries],
      });
    } else {
      existing.entries.push(...meal.entries);
    }
  }

  return Array.from(map.values());
}
