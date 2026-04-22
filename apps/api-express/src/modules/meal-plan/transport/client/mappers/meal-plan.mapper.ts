import { Prisma } from "@prisma/client";
import { MealPlanDTO } from "../../../dto/meal-plan.dto";
import { toDateKey } from "../../../../../shared/helpers/toDateKey";

// =========================
// RAW TYPE
// =========================

type UserRaw = {
  id: string;
  firstName: string;
  avatarUrl: string | null;
};

type MealEntryRaw = Prisma.MealEntryGetPayload<{
  include: {
    mealType: {
      select: {
        id: true;
        nameUa: true;
        orderIndex: true;
      };
    };

    user: {
      select: {
        id: true;
        firstName: true;
        avatarUrl: true;
      };
    };

    recipe: {
      select: {
        id: true;
        title: true;
        baseServings: true;
        baseOutputWeightG: true;
      };
    };

    product: {
      select: {
        id: true;
        nameUa: true;
        unit: true;
      };
    };
  };
}>;

// =========================
// HELPERS
// =========================

function getEntryType(e: MealEntryRaw): "recipe" | "product" {
  return e.recipe ? "recipe" : "product";
}

function mapUser(u: UserRaw) {
  return {
    id: u.id,
    firstName: u.firstName,
    avatarUrl: u.avatarUrl,
  };
}

// =========================
// MAPPER
// =========================

export function mapToWeekView(
  entries: MealEntryRaw[],
  weekStart: Date,
): MealPlanDTO {
  // =========================
  // PRE-GROUP BY DATE (O(n))
  // =========================

  const entriesByDate = new Map<string, MealEntryRaw[]>();

  for (const e of entries) {
    const key = toDateKey(e.date);

    if (!entriesByDate.has(key)) {
      entriesByDate.set(key, []);
    }

    entriesByDate.get(key)!.push(e);
  }

  // =========================
  // BUILD DAYS
  // =========================

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);

    const dateStr = toDateKey(d);

    const dayEntries = entriesByDate.get(dateStr) ?? [];

    // =========================
    // GROUP BY MEAL TYPE
    // =========================

    const mealsMap = new Map<string, MealEntryRaw[]>();

    for (const entry of dayEntries) {
      if (!mealsMap.has(entry.mealTypeId)) {
        mealsMap.set(entry.mealTypeId, []);
      }

      mealsMap.get(entry.mealTypeId)!.push(entry);
    }

    // =========================
    // BUILD MEALS
    // =========================

    const meals = Array.from(mealsMap.entries())
      .sort(([, a], [, b]) => {
        const orderA = a[0]?.mealType.orderIndex ?? 0;
        const orderB = b[0]?.mealType.orderIndex ?? 0;

        return orderA - orderB;
      })
      .map(([mealTypeId, mealEntries]) => {
        const first = mealEntries[0];

        return {
          mealTypeId,
          mealTypeName: first?.mealType.nameUa ?? "",

          entries: mealEntries
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .map((e) => ({
              id: e.id,
              type: getEntryType(e),
              amount: e.amount,

              user: mapUser(e.user as UserRaw),

              recipe: e.recipe
                ? {
                    id: e.recipe.id,
                    name: e.recipe.title,
                    weightPerServing:
                      e.recipe.baseServings > 0
                        ? e.recipe.baseOutputWeightG / e.recipe.baseServings
                        : 0,
                  }
                : undefined,

              product: e.product
                ? {
                    id: e.product.id,
                    name: e.product.nameUa,
                    unit: e.product.unit,
                  }
                : undefined,
            })),
        };
      });

    return {
      date: dateStr,
      meals,
    };
  });

  // =========================
  // WEEK META
  // =========================

  const start = toDateKey(weekStart);

  const endDate = new Date(weekStart);
  endDate.setDate(endDate.getDate() + 6);

  const end = toDateKey(endDate);

  return {
    week: {
      start,
      end,
    },
    days,
  };
}
