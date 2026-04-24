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
      avatarUrl: true,
    },
  },
  recipe: {
    select: {
      id: true,
      title: true,
      baseServings: true,
      baseOutputWeightG: true,
    },
  },
  product: {
    select: {
      id: true,
      nameUa: true,
      unit: true,
    },
  },
} satisfies Prisma.MealEntryInclude;

export type MealEntryWithRelations = Prisma.MealEntryGetPayload<{
  include: typeof mealEntryInclude;
}>;
