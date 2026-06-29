import { MealEntryWithRelations } from "../types/meal-plan.types";
import {
  AggregatedMealItemDTO,
  AggregatedMealPlanDTO,
  AggregatedSummaryDTO,
} from "../../../dto/aggregated-meal-plan.dto";

type AggregateMode = "all" | "mealType";

function buildAggregatedItems(
  entries: MealEntryWithRelations[],
  mode: AggregateMode,
): AggregatedMealItemDTO[] {
  const map = new Map<
    string,
    AggregatedMealItemDTO & {
      preparedCount: number;
      totalCount: number;
      firstCreatedAtMs: number;
      firstMealTypeOrderIndex: number;
    }
  >();

  for (const entry of entries) {
    const isRecipe = !!entry.recipe;

    const key =
      mode === "all"
        ? isRecipe
          ? `recipe-${entry.recipe!.id}`
          : `product-${entry.product!.id}`
        : isRecipe
          ? `recipe-${entry.recipe!.id}-${entry.mealTypeId}`
          : `product-${entry.product!.id}-${entry.mealTypeId}`;

    if (!map.has(key)) {
      map.set(key, {
        id: isRecipe ? entry.recipe!.id : entry.product!.id,
        type: isRecipe ? "recipe" : "product",
        name: isRecipe ? entry.recipe!.title : entry.product!.nameUa,

        categoryId: entry.recipe?.recipeTypeId ?? undefined,
        categoryCode: isRecipe
          ? entry.recipe!.recipeType?.code
          : normalizeCategoryCode(entry.product!.category.nameEn),
        categoryName: isRecipe
          ? entry.recipe!.recipeType?.nameUa
          : entry.product!.category.nameUa,

        photoUrl: isRecipe ? (entry.recipe!.photoUrl ?? undefined) : undefined,
        totalTime: isRecipe
          ? (entry.recipe!.prepTimeMin ?? 0) + (entry.recipe!.cookTimeMin ?? 0)
          : undefined,
        difficulty: isRecipe
          ? (entry.recipe!.difficulty ?? undefined)
          : undefined,

        totalWeight: 0,
        portions: 0,
        unit: isRecipe ? "g" : entry.product!.unit,

        users: [],
        entryIds: [],
        isPrepared: false,

        mealTypes: [],

        sort: {
          firstCreatedAt: entry.createdAt.toISOString(),
          firstMealTypeOrderIndex: entry.mealType.orderIndex,
        },

        preparedCount: 0,
        totalCount: 0,
        firstCreatedAtMs: entry.createdAt.getTime(),
        firstMealTypeOrderIndex: entry.mealType.orderIndex,
      });
    }

    const item = map.get(key)!;

    item.totalWeight += entry.amountInGrams ?? 0;
    item.portions += 1;
    item.entryIds.push(entry.id);
    item.totalCount += 1;

    if (entry.status === "prepared") {
      item.preparedCount += 1;
    }

    if (!item.users.find((u) => u.id === entry.user.id)) {
      item.users.push({
        id: entry.user.id,
        firstName: entry.user.firstName,
        sex: entry.user.sex,
        avatarUrl: entry.user.avatarUrl,
      });
    }

    if (!item.mealTypes.find((m) => m.id === entry.mealType.id)) {
      item.mealTypes.push({
        id: entry.mealType.id,
        name: entry.mealType.nameUa,
        orderIndex: entry.mealType.orderIndex,
      });
    }

    item.firstCreatedAtMs = Math.min(
      item.firstCreatedAtMs,
      entry.createdAt.getTime(),
    );

    item.firstMealTypeOrderIndex = Math.min(
      item.firstMealTypeOrderIndex,
      entry.mealType.orderIndex,
    );
  }

  return Array.from(map.values())
    .map(
      ({
        preparedCount,
        totalCount,
        firstCreatedAtMs,
        firstMealTypeOrderIndex,
        ...rest
      }) => ({
        ...rest,
        isPrepared: preparedCount === totalCount,
        mealTypes: [...rest.mealTypes].sort(
          (a, b) => a.orderIndex - b.orderIndex,
        ),
        sort: {
          firstCreatedAt: new Date(firstCreatedAtMs).toISOString(),
          firstMealTypeOrderIndex,
        },
      }),
    )
    .sort((a, b) => {
      if (a.sort.firstMealTypeOrderIndex !== b.sort.firstMealTypeOrderIndex) {
        return a.sort.firstMealTypeOrderIndex - b.sort.firstMealTypeOrderIndex;
      }

      return (
        new Date(a.sort.firstCreatedAt).getTime() -
        new Date(b.sort.firstCreatedAt).getTime()
      );
    });
}

function makeSummary(items: AggregatedMealItemDTO[]): AggregatedSummaryDTO {
  const totalItems = items.length;
  const preparedItems = items.filter((i) => i.isPrepared).length;
  const progress = totalItems === 0 ? 0 : preparedItems / totalItems;

  return {
    totalItems,
    preparedItems,
    progress,
  };
}

export function mapToAggregatedMealPlan(
  entries: MealEntryWithRelations[],
): AggregatedMealPlanDTO {
  const mealTypes = Array.from(
    new Map(
      entries.map((entry) => [
        entry.mealType.id,
        {
          id: entry.mealType.id,
          name: entry.mealType.nameUa,
          orderIndex: entry.mealType.orderIndex,
        },
      ]),
    ).values(),
  ).sort((a, b) => a.orderIndex - b.orderIndex);

  const allItems = buildAggregatedItems(entries, "all");

  const byMealType = mealTypes.map((mealType) => {
    const items = buildAggregatedItems(
      entries.filter((entry) => entry.mealTypeId === mealType.id),
      "mealType",
    );

    return {
      mealType,
      summary: makeSummary(items),
      items,
    };
  });

  return {
    tabs: [{ id: "all", name: "Всі", orderIndex: -1 }, ...mealTypes],
    views: {
      all: {
        summary: makeSummary(allItems),
        items: allItems,
      },
      byMealType,
    },
  };
}

// export function mapToAggregatedMealPlan(
//   entries: MealEntryWithRelations[],
// ): AggregatedMealPlanDTO {
//   const map = new Map<
//     string,
//     AggregatedMealItemDTO & {
//       preparedCount: number;
//       totalCount: number;
//       sortCreatedAt: number;
//     }
//   >();

//   for (const entry of entries) {
//     const isRecipe = !!entry.recipe;

//     const key = isRecipe
//       ? `recipe-${entry.recipe!.id}-${entry.mealTypeId}`
//       : `product-${entry.product!.id}-${entry.mealTypeId}`;

//     if (!map.has(key)) {
//       map.set(key, {
//         id: isRecipe ? entry.recipe!.id : entry.product!.id,
//         type: isRecipe ? "recipe" : "product",
//         categoryId: entry.recipe?.recipeTypeId ?? undefined,
//         categoryCode: isRecipe
//           ? entry.recipe!.recipeType?.code
//           : normalizeCategoryCode(entry.product!.category.nameEn),
//         categoryName: isRecipe
//           ? entry.recipe!.recipeType?.nameUa
//           : entry.product!.category.nameUa,

//         photoUrl: isRecipe ? (entry.recipe!.photoUrl ?? undefined) : undefined,

//         totalTime: isRecipe
//           ? (entry.recipe!.prepTimeMin ?? 0) + (entry.recipe!.cookTimeMin ?? 0)
//           : undefined,

//         difficulty: isRecipe
//           ? (entry.recipe!.difficulty ?? undefined)
//           : undefined,

//         name: isRecipe ? entry.recipe!.title : entry.product!.nameUa,

//         totalWeight: 0,
//         portions: 0,

//         // 🔥 FIX: users типізуємо явно
//         users: [] as AggregatedMealItemDTO["users"],

//         mealTypeId: entry.mealTypeId,
//         mealTypeName: entry.mealType.nameUa,
//         mealTypeOrderIndex: entry.mealType.orderIndex,

//         // 🔥 FIX: типізуємо
//         entryIds: [] as string[],

//         // 🔥 NEW
//         unit: isRecipe ? "g" : entry.product!.unit,

//         isPrepared: false,

//         preparedCount: 0,
//         totalCount: 0,
//         sortCreatedAt: entry.createdAt.getTime(),
//       });
//     }

//     const item = map.get(key)!;
//     item.sortCreatedAt = Math.min(
//       item.sortCreatedAt,
//       entry.createdAt.getTime(),
//     );

//     // =========================
//     // PORTIONS
//     // =========================

//     item.portions += 1;

//     // =========================
//     // WEIGHT
//     // =========================

//     const weight = entry.amountInGrams ?? 0; // 🔥 safety

//     item.totalWeight += weight;

//     // =========================
//     // USERS
//     // =========================

//     if (!item.users.find((u) => u.id === entry.user.id)) {
//       item.users.push({
//         id: entry.user.id,
//         firstName: entry.user.firstName,
//         sex: entry.user.sex,
//         avatarUrl: entry.user.avatarUrl,
//       });
//     }

//     // =========================
//     // ENTRY IDS
//     // =========================

//     item.entryIds.push(entry.id);

//     // =========================
//     // STATUS
//     // =========================

//     item.totalCount += 1;

//     if (entry.status === "prepared") {
//       item.preparedCount += 1;
//     }
//   }

//   const items: AggregatedMealItemDTO[] = Array.from(map.values())
//     .sort((a, b) => {
//       const mealTypeOrder = a.mealTypeName.localeCompare(b.mealTypeName, "uk");

//       if (mealTypeOrder !== 0) {
//         return mealTypeOrder;
//       }

//       return a.sortCreatedAt - b.sortCreatedAt;
//     })
//     .map(({ preparedCount, totalCount, sortCreatedAt, ...rest }) => ({
//       ...rest,
//       isPrepared: preparedCount === totalCount,
//     }));

//   // =========================
//   // SUMMARY
//   // =========================

//   const totalItems = items.length;
//   const preparedItems = items.filter((i) => i.isPrepared).length;

//   const progress = totalItems === 0 ? 0 : preparedItems / totalItems;

//   return {
//     summary: {
//       totalItems,
//       preparedItems,
//       progress,
//     },
//     items,
//   };
// }

function normalizeCategoryCode(nameEn: string): string {
  return nameEn
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}
