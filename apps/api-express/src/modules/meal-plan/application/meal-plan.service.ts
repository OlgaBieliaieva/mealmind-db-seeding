import { MealPlanRepository } from "../domain/meal-plan.repository";
import { mapToWeekView } from "../transport/client/mappers/meal-plan.mapper";
import { mapToAggregatedMealPlan } from "../transport/client/mappers/aggregated-meal-plan.mapper";
import { toUTCDateOnly } from "../../../shared/helpers/toDateKey";

export class MealPlanService {
  constructor(private repo: MealPlanRepository) {}

  // =========================
  // UTILS (UTC SAFE)
  // =========================

  private getWeekStart(date: Date) {
    const d = new Date(date);

    const day = d.getUTCDay() || 7;

    if (day !== 1) {
      d.setUTCDate(d.getUTCDate() - (day - 1));
    }

    d.setUTCHours(0, 0, 0, 0);

    return d;
  }

  private toDateKeyUTC(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  private addDaysUTC(dateStr: string, days: number) {
    const d = toUTCDateOnly(dateStr);
    d.setUTCDate(d.getUTCDate() + days);
    return this.toDateKeyUTC(d);
  }

  private getPeriod(date: string) {
    const base = toUTCDateOnly(date);

    const day = base.getUTCDay() === 0 ? 7 : base.getUTCDay();

    const monday = new Date(base);
    monday.setUTCDate(base.getUTCDate() - day + 1);
    monday.setUTCHours(0, 0, 0, 0);

    const weekStartStr = this.toDateKeyUTC(monday);

    const from = toUTCDateOnly(weekStartStr);
    const to = toUTCDateOnly(this.addDaysUTC(weekStartStr, 6));

    return {
      weekStart: from,
      from,
      to,
    };
  }

  // =========================
  // PLAN
  // =========================

  async getOrCreatePlan(familyId: string, date: string) {
    const baseDate = toUTCDateOnly(date);
    const weekStart = this.getWeekStart(baseDate);

    let plan = await this.repo.findByFamilyAndWeek(familyId, weekStart);

    if (!plan) {
      plan = await this.repo.createPlan(familyId, weekStart);
    }

    return plan;
  }

  // =========================
  // READ
  // =========================

  async getPlanEntries(familyId: string, date: string, days?: string) {
    const { weekStart } = this.getPeriod(date);

    let plan = await this.repo.findByFamilyAndWeek(familyId, weekStart);

    if (!plan) {
      plan = await this.repo.createPlan(familyId, weekStart);
    }

    let entries;

    if (days) {
      const selectedDates = days.split(",").map(toUTCDateOnly);
      entries = await this.repo.findEntriesByDates(plan.id, selectedDates);
    } else {
      const selectedDate = toUTCDateOnly(date);
      entries = await this.repo.findEntriesByDates(plan.id, [selectedDate]);
    }

    const periodDaysCount = days ? days.split(",").filter(Boolean).length : 1;

    return {
      week: mapToWeekView(entries, weekStart),
      aggregated: mapToAggregatedMealPlan(entries, periodDaysCount),
    };
  }

  // =========================
  // INTERNAL: NORMALIZATION
  // =========================

  private async normalizeAmount(entry: {
    recipeId?: string;
    productId?: string;
    amount: number;
    unit: "g" | "ml" | "portion";
  }) {
    let amountInGrams = entry.amount;

    if (entry.unit === "portion") {
      if (!entry.recipeId) {
        throw new Error("Portion unit allowed only for recipe");
      }

      const recipe = await this.repo.getRecipe(entry.recipeId);

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      const weightPerServing = recipe.baseOutputWeightG / recipe.baseServings;

      amountInGrams = entry.amount * weightPerServing;
    }

    if (entry.unit === "ml") {
      amountInGrams = entry.amount; // TODO: density later
    }

    return amountInGrams;
  }

  // =========================
  // CREATE (SINGLE)
  // =========================

  async addEntry(input: {
    familyId: string;
    date: string;
    userId: string;
    mealTypeId: string;
    recipeId?: string;
    productId?: string;
    amount: number;
    unit: "g" | "ml" | "portion";
  }) {
    const dateObj = toUTCDateOnly(input.date);

    const { weekStart } = this.getPeriod(input.date);

    let plan = await this.repo.findByFamilyAndWeek(input.familyId, weekStart);

    if (!plan) {
      plan = await this.repo.createPlan(input.familyId, weekStart);
    }

    const amountInGrams = await this.normalizeAmount(input);

    return this.repo.createEntry({
      mealPlanId: plan.id,
      date: dateObj,
      userId: input.userId,
      mealTypeId: input.mealTypeId,
      recipeId: input.recipeId,
      productId: input.productId,
      amount: input.amount,
      unit: input.unit,
      amountInGrams,
    });
  }

  // =========================
  // CREATE (BULK)
  // =========================

  async addEntriesBulk(input: {
    familyId: string;
    entries: {
      date: string;
      userId: string;
      mealTypeId: string;
      recipeId?: string;
      productId?: string;
      amount: number;
      unit: "g" | "ml" | "portion";
    }[];
  }) {
    if (!input.entries.length) return [];

    const { weekStart } = this.getPeriod(input.entries[0].date);

    let plan = await this.repo.findByFamilyAndWeek(input.familyId, weekStart);

    if (!plan) {
      plan = await this.repo.createPlan(input.familyId, weekStart);
    }

    const normalizedEntries = await Promise.all(
      input.entries.map(async (e) => {
        const amountInGrams = await this.normalizeAmount(e);

        return {
          mealPlanId: plan.id,
          date: toUTCDateOnly(e.date),
          userId: e.userId,
          mealTypeId: e.mealTypeId,
          recipeId: e.recipeId,
          productId: e.productId,
          amount: e.amount,
          unit: e.unit,
          amountInGrams,
        };
      }),
    );

    return this.repo.createManyEntries(normalizedEntries);
  }

  // =========================
  // DELETE
  // =========================

  async removeEntry(entryId: string) {
    return this.repo.deleteEntry(entryId);
  }

  // =========================
  // UPDATE
  // =========================

  async toggleEntryStatus(id: string) {
    return this.repo.toggleStatus(id);
  }

  async toggleEntries(ids: string[]) {
    return this.repo.toggleMany(ids);
  }
}
