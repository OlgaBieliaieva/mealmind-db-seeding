import { MealPlanRepository } from "../domain/meal-plan.repository";
import { mapToWeekView } from "../transport/client/mappers/meal-plan.mapper";
import { mapToAggregatedMealPlan } from "../transport/client/mappers/aggregated-meal-plan.mapper";
import { toUTCDateOnly } from "../../../shared/helpers/toDateKey";

export class MealPlanService {
  constructor(private repo: MealPlanRepository) {}

  // =========================
  // UTILS
  // =========================

  private getWeekStart(date: Date) {
    const d = new Date(date);
    const day = d.getDay() || 7;
    if (day !== 1) {
      d.setDate(d.getDate() - (day - 1));
    }
    return new Date(d.toISOString().split("T")[0]);
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
    const weekStart = this.getWeekStart(new Date(date));

    let plan = await this.repo.findByFamilyAndWeek(familyId, weekStart);

    if (!plan) {
      plan = await this.repo.createPlan(familyId, weekStart);
    }

    return plan;
  }

  // =========================
  // READ
  // =========================

  async getPlanEntries(
  familyId: string,
  date: string,
  days?: string,
) {
    const { weekStart } = this.getPeriod(date);

// план
let plan = await this.repo.findByFamilyAndWeek(familyId, weekStart);
if (!plan) {
  plan = await this.repo.createPlan(familyId, weekStart);
}

// =========================
// 🔥 FILTER LOGIC
// =========================

let entries;

if (days) {
  const selectedDates = days.split(",").map(toUTCDateOnly);

  entries = await this.repo.findEntriesByDates(plan.id, selectedDates);
} else {
  const selectedDate = toUTCDateOnly(date);

  entries = await this.repo.findEntriesByDates(plan.id, [selectedDate]);
}

    return {
      week: mapToWeekView(entries, weekStart),
      aggregated: mapToAggregatedMealPlan(entries),
    };
  }

  // =========================
  // CREATE
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
    const dateObj = new Date(input.date);

    const { weekStart } = this.getPeriod(input.date);

    // 1️⃣ план
    let plan = await this.repo.findByFamilyAndWeek(input.familyId, weekStart);

    if (!plan) {
      plan = await this.repo.createPlan(input.familyId, weekStart);
    }

    // 2️⃣ нормалізація
    let amountInGrams = input.amount;

    if (input.unit === "portion") {
      if (!input.recipeId) {
        throw new Error("Portion unit allowed only for recipe");
      }

      const recipe = await this.repo.getRecipe(input.recipeId);

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      const weightPerServing = recipe.baseOutputWeightG / recipe.baseServings;

      amountInGrams = input.amount * weightPerServing;
    }

    if (input.unit === "ml") {
      amountInGrams = input.amount; // поки 1:1
    }

    // 3️⃣ create
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
