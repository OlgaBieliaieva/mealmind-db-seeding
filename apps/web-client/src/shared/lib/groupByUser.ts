import { AggregatedMealItemDTO } from "../types/meal-plan.types";

type UserGroup = {
  userId: string;
  meals: AggregatedMealItemDTO[];
};

export function groupByUser(meals: AggregatedMealItemDTO[]): UserGroup[] {
  const map = new Map<string, UserGroup>();

  for (const meal of meals) {
    for (const user of meal.users) {
      if (!map.has(user.id)) {
        map.set(user.id, {
          userId: user.id,
          meals: [],
        });
      }

      const group = map.get(user.id)!;

      group.meals.push({
        ...meal,
        users: [user], // 🔥 важливо: тільки цей юзер
      });
    }
  }

  return Array.from(map.values());
}
