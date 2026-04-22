import { PrismaClient } from "@prisma/client";

export class MealPlanRepository {
  constructor(private prisma: PrismaClient) {}

  // =========================
  // PLAN
  // =========================

  async findByFamilyAndWeek(familyId: string, weekStart: Date) {
    return this.prisma.mealPlan.findUnique({
      where: {
        familyId_weekStart: {
          familyId,
          weekStart,
        },
      },
    });
  }

  async createPlan(familyId: string, weekStart: Date) {
    return this.prisma.mealPlan.create({
      data: {
        familyId,
        weekStart,
      },
    });
  }

  // =========================
  // ENTRIES
  // =========================

  async findEntries(planId: string, from: Date, to: Date) {
    return this.prisma.mealEntry.findMany({
      where: {
        mealPlanId: planId,
        date: {
          gte: from,
          lte: to,
        },
      },
      include: {
        mealType: true,
        recipe: true,
        product: true,
      },
    });
  }

  async createEntry(data: {
    mealPlanId: string;
    date: Date;
    userId: string;
    mealTypeId: string;
    recipeId?: string;
    productId?: string;
    amount: number;
  }) {
    return this.prisma.mealEntry.create({ data });
  }

  async deleteEntry(id: string) {
    return this.prisma.mealEntry.delete({
      where: { id },
    });
  }
}
