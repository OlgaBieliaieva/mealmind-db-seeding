import { MealEntryWithRelations } from "../types/meal-plan.types";
import {
  AggregatedMealItemDTO,
  AggregatedMealPlanDTO,
} from "../../../dto/aggregated-meal-plan.dto";

export function mapToAggregatedMealPlan(
  entries: MealEntryWithRelations[],
): AggregatedMealPlanDTO {
  const map = new Map<
    string,
    AggregatedMealItemDTO & {
      preparedCount: number;
      totalCount: number;
    }
  >();

  for (const entry of entries) {
    const isRecipe = !!entry.recipe;

    const key = isRecipe
      ? `recipe-${entry.recipe!.id}`
      : `product-${entry.product!.id}`;

    if (!map.has(key)) {
      map.set(key, {
        id: isRecipe ? entry.recipe!.id : entry.product!.id,
        type: isRecipe ? "recipe" : "product",

        name: isRecipe ? entry.recipe!.title : entry.product!.nameUa,

        totalWeight: 0,
        portions: 0,

        // 🔥 FIX: users типізуємо явно
        users: [] as AggregatedMealItemDTO["users"],

        mealTypeId: entry.mealTypeId,

        // 🔥 FIX: типізуємо
        entryIds: [] as string[],

        // 🔥 NEW
        unit: isRecipe ? "g" : entry.product!.unit,

        isPrepared: false,

        preparedCount: 0,
        totalCount: 0,
      });
    }

    const item = map.get(key)!;

    // =========================
    // PORTIONS
    // =========================

    item.portions += 1;

    // =========================
    // WEIGHT
    // =========================

    const weight = entry.amountInGrams ?? 0; // 🔥 safety

    item.totalWeight += weight;

    // =========================
    // USERS
    // =========================

    if (!item.users.find((u) => u.id === entry.user.id)) {
      item.users.push({
        id: entry.user.id,
        firstName: entry.user.firstName,
        avatarUrl: entry.user.avatarUrl,
      });
    }

    // =========================
    // ENTRY IDS
    // =========================

    item.entryIds.push(entry.id);

    // =========================
    // STATUS
    // =========================

    item.totalCount += 1;

    if (entry.status === "prepared") {
      item.preparedCount += 1;
    }
  }

  const items: AggregatedMealItemDTO[] = Array.from(map.values()).map(
    ({ preparedCount, totalCount, ...rest }) => ({
      ...rest,
      isPrepared: preparedCount === totalCount,
    }),
  );

  // =========================
  // SUMMARY
  // =========================

  const totalItems = items.length;
  const preparedItems = items.filter((i) => i.isPrepared).length;

  const progress = totalItems === 0 ? 0 : preparedItems / totalItems;

  return {
    summary: {
      totalItems,
      preparedItems,
      progress,
    },
    items,
  };
}
