import { Prisma } from "@prisma/client";

export const mealEntryInclude = {
  mealType: {
    select: {
      id: true,
      nameUa: true,
      orderIndex: true,
    },
  },
  user: {
    select: {
      id: true,
      firstName: true,
      sex: true,
      avatarUrl: true,
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
    },
  },
} satisfies Prisma.MealEntryInclude;

export type MealEntryWithRelations = Prisma.MealEntryGetPayload<{
  include: typeof mealEntryInclude;
}>;
