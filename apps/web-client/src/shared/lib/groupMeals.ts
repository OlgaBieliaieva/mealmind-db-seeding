import { MealDTO } from "../types/meal-plan.types";

export function groupMeals(meals: MealDTO[]): MealDTO[] {
  console.log(meals);

  const map = new Map<string, MealDTO>();

  for (const meal of meals) {
    const existing = map.get(meal.mealTypeId);
    console.log(existing);

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
