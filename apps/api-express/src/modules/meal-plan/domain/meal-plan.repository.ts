import { PrismaClient, MealEntryStatus } from "@prisma/client";
import { mealEntryInclude } from "../transport/client/types/meal-plan.types";

export class MealPlanRepository {
  constructor(private prisma: PrismaClient) {}

  // =========================
  // HELPERS
  // =========================

  private startOfDay(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private nextDay(date: Date) {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  async getRecipe(id: string) {
    return this.prisma.recipe.findUnique({
      where: { id },
      select: {
        id: true,
        baseServings: true,
        baseOutputWeightG: true,
      },
    });
  }

  // =========================
  // PLAN
  // =========================

  async findByFamilyAndWeek(familyId: string, weekStart: Date) {
    return this.prisma.mealPlan.findFirst({
      where: {
        familyId,
        weekStart: {
          equals: weekStart,
        },
      },
    });
  }

  async createPlan(familyId: string, weekStart: Date) {
    return this.prisma.mealPlan.create({
      data: {
        familyId,
        weekStart: this.startOfDay(weekStart),
      },
    });
  }

  // =========================
  // ENTRIES
  // =========================

  async findEntries(planId: string) {
    return this.prisma.mealEntry.findMany({
      where: {
        mealPlanId: planId,
      },
      include: mealEntryInclude,
    });
  }

  async findEntriesByDates(planId: string, dates: Date[]) {
    console.log(planId);
    console.log(dates);
    
    
    return this.prisma.mealEntry.findMany({
      where: {
        mealPlanId: planId,
        date: {
          in: dates,
        },
      },
      include: mealEntryInclude,
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
    unit: "g" | "ml" | "portion";
    amountInGrams: number;
  }) {
    return this.prisma.mealEntry.create({
      data: {
        ...data,
        date: this.startOfDay(data.date),
      },
    });
  }

  async deleteEntry(id: string) {
    return this.prisma.mealEntry.delete({
      where: { id },
    });
  }

  // =========================
  // STATUS
  // =========================

  async toggleStatus(id: string) {
    const entry = await this.prisma.mealEntry.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!entry) {
      throw new Error("MealEntry not found");
    }

    return this.prisma.mealEntry.update({
      where: { id },
      data: {
        status:
          entry.status === MealEntryStatus.prepared
            ? MealEntryStatus.planned
            : MealEntryStatus.prepared,
      },
    });
  }

  async toggleMany(ids: string[]) {
    const entries = await this.prisma.mealEntry.findMany({
      where: { id: { in: ids } },
      select: { id: true, status: true },
    });

    if (!entries.length) return;

    const updates = entries.map((e) =>
      this.prisma.mealEntry.update({
        where: { id: e.id },
        data: {
          status:
            e.status === MealEntryStatus.prepared
              ? MealEntryStatus.planned
              : MealEntryStatus.prepared,
        },
      }),
    );

    await this.prisma.$transaction(updates);
  }
}
