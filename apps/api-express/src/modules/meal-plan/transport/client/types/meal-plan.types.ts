import { Prisma } from "@prisma/client";

export const mealPlanUserSelect = {
  id: true,
  firstName: true,
  sex: true,
  birthDate: true,
  heightCm: true,
  avatarUrl: true,
  nutrientTargets: {
    select: {
      targetValue: true,
      calculated: true,
      nutrient: {
        select: {
          code: true,
          nameUa: true,
          defaultUnit: true,
          nutrientGroup: true,
        },
      },
    },
  },
  bodyMetrics: {
    orderBy: { createdAt: "desc" },
    take: 1,
    select: {
      weightKg: true,
      activityLevel: true,
      goal: true,
      goalRate: true,
      createdAt: true,
    },
  },
  mealSettings: {
    orderBy: { createdAt: "desc" },
    take: 1,
    select: {
      mealsPerDay: true,
      snacksEnabled: true,
      createdAt: true,
    },
  },
} satisfies Prisma.UserSelect;

export const mealEntryInclude = {
  mealType: {
    select: {
      id: true,
      code: true,
      nameUa: true,
      orderIndex: true,
    },
  },
  user: {
    select: mealPlanUserSelect,
  },
  recipe: {
    select: {
      id: true,
      title: true,
      photoUrl: true,
      difficulty: true,
      recipeTypeId: true,
      baseServings: true,
      baseOutputWeightG: true,
      prepTimeMin: true,
      cookTimeMin: true,

      recipeType: {
        select: {
          id: true,
          code: true,
          nameUa: true,
        },
      },

      nutrients: {
        select: {
          valueTotal: true,
          unit: true,
          nutrient: {
            select: {
              code: true,
            },
          },
        },
      },
    },
  },
  product: {
    select: {
      id: true,
      nameUa: true,
      unit: true,
      category: {
        select: {
          id: true,
          nameEn: true,
          nameUa: true,
        },
      },
      nutrients: {
        select: {
          valuePer100g: true,
          unit: true,
          nutrient: {
            select: {
              code: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.MealEntryInclude;

export type MealPlanUser = Prisma.UserGetPayload<{
  select: typeof mealPlanUserSelect;
}>;
export type MealEntryWithRelations = Prisma.MealEntryGetPayload<{
  include: typeof mealEntryInclude;
}>;
