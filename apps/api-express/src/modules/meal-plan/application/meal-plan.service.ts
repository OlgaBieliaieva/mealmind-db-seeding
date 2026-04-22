import { MealPlanRepository } from "../domain/meal-plan.repository";
import { mapToWeekView } from "../transport/client/mappers/meal-plan.mapper";

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

  async getPlanEntries(familyId: string, date: string) {
    const plan = await this.getOrCreatePlan(familyId, date);

    const from = new Date(plan.weekStart);
    const to = new Date(from);
    to.setDate(to.getDate() + 6);

    const entries = await this.repo.findEntries(plan.id, from, to);

    return mapToWeekView(entries, from);
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
  }) {
    // 🔥 бізнес-правило
    if (!input.recipeId && !input.productId) {
      throw new Error("Either recipeId or productId required");
    }

    if (input.recipeId && input.productId) {
      throw new Error("Only one of recipeId or productId allowed");
    }

    const plan = await this.getOrCreatePlan(input.familyId, input.date);

    return this.repo.createEntry({
      mealPlanId: plan.id,
      date: new Date(input.date),
      userId: input.userId,
      mealTypeId: input.mealTypeId,
      recipeId: input.recipeId,
      productId: input.productId,
      amount: input.amount,
    });
  }

  // =========================
  // DELETE
  // =========================

  async removeEntry(entryId: string) {
    return this.repo.deleteEntry(entryId);
  }
}
