import { MealDTO, MealEntryDTO } from "../types/meal-plan.types";

type UserGroup = {
  userId: string;
  meals: MealDTO[];
};

export function groupByUser(meals: MealDTO[]): UserGroup[] {
  const map = new Map<string, UserGroup>();

  for (const meal of meals) {
    for (const entry of meal.entries) {
      const userId =
        (entry as MealEntryDTO & { userId?: string }).userId ?? "unknown";

      if (!map.has(userId)) {
        map.set(userId, {
          userId,
          meals: [],
        });
      }

      const userGroup = map.get(userId)!;

      let mealGroup = userGroup.meals.find(
        (m) => m.mealTypeId === meal.mealTypeId,
      );

      if (!mealGroup) {
        mealGroup = {
          mealTypeId: meal.mealTypeId,
          entries: [],
        };
        userGroup.meals.push(mealGroup);
      }

      mealGroup.entries.push(entry);
    }
  }

  return Array.from(map.values());
}
