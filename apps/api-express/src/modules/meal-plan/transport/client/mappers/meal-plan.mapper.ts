type MealEntryRaw = {
  id: string;
  date: Date;
  mealTypeId: string;
  recipeId?: string | null;
  productId?: string | null;
  amount: number;
};

export function mapToWeekView(entries: MealEntryRaw[], weekStart: Date) {
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);

    const dateStr = d.toISOString().split("T")[0];

    const dayEntries = entries.filter((e) =>
      e.date.toISOString().startsWith(dateStr),
    );

    const mealsMap = new Map<string, MealEntryRaw[]>();

    for (const entry of dayEntries) {
      if (!mealsMap.has(entry.mealTypeId)) {
        mealsMap.set(entry.mealTypeId, []);
      }
      mealsMap.get(entry.mealTypeId)!.push(entry);
    }

    const meals = Array.from(mealsMap.entries()).map(
      ([mealTypeId, entries]) => ({
        mealTypeId,
        entries: entries.map((e) => ({
          id: e.id,
          type: e.recipeId ? "recipe" : "product",
          refId: e.recipeId ?? e.productId,
          amount: e.amount,
        })),
      }),
    );

    return {
      date: dateStr,
      meals,
    };
  });

  return {
    week: {
      start: weekStart.toISOString().split("T")[0],
      end: new Date(new Date(weekStart).setDate(weekStart.getDate() + 6))
        .toISOString()
        .split("T")[0],
    },
    days,
  };
}
