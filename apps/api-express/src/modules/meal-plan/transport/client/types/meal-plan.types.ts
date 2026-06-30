import { Prisma } from "@prisma/client";

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
    select: {
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
            },
          },
        },
      },

      bodyMetrics: {
        orderBy: {
          createdAt: "desc",
        },
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
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          mealsPerDay: true,
          snacksEnabled: true,
          createdAt: true,
        },
      },
    },
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

export type MealEntryWithRelations = Prisma.MealEntryGetPayload<{
  include: typeof mealEntryInclude;
}>;
