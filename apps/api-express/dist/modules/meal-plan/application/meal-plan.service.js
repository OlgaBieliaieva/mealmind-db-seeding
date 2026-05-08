"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanService = void 0;
const meal_plan_mapper_1 = require("../transport/client/mappers/meal-plan.mapper");
const aggregated_meal_plan_mapper_1 = require("../transport/client/mappers/aggregated-meal-plan.mapper");
const toDateKey_1 = require("../../../shared/helpers/toDateKey");
class MealPlanService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    // =========================
    // UTILS (UTC SAFE)
    // =========================
    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getUTCDay() || 7;
        if (day !== 1) {
            d.setUTCDate(d.getUTCDate() - (day - 1));
        }
        d.setUTCHours(0, 0, 0, 0);
        return d;
    }
    toDateKeyUTC(date) {
        return date.toISOString().slice(0, 10);
    }
    addDaysUTC(dateStr, days) {
        const d = (0, toDateKey_1.toUTCDateOnly)(dateStr);
        d.setUTCDate(d.getUTCDate() + days);
        return this.toDateKeyUTC(d);
    }
    getPeriod(date) {
        const base = (0, toDateKey_1.toUTCDateOnly)(date);
        const day = base.getUTCDay() === 0 ? 7 : base.getUTCDay();
        const monday = new Date(base);
        monday.setUTCDate(base.getUTCDate() - day + 1);
        monday.setUTCHours(0, 0, 0, 0);
        const weekStartStr = this.toDateKeyUTC(monday);
        const from = (0, toDateKey_1.toUTCDateOnly)(weekStartStr);
        const to = (0, toDateKey_1.toUTCDateOnly)(this.addDaysUTC(weekStartStr, 6));
        return {
            weekStart: from,
            from,
            to,
        };
    }
    // =========================
    // PLAN
    // =========================
    async getOrCreatePlan(familyId, date) {
        const baseDate = (0, toDateKey_1.toUTCDateOnly)(date);
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
    async getPlanEntries(familyId, date, days) {
        const { weekStart } = this.getPeriod(date);
        let plan = await this.repo.findByFamilyAndWeek(familyId, weekStart);
        if (!plan) {
            plan = await this.repo.createPlan(familyId, weekStart);
        }
        let entries;
        if (days) {
            const selectedDates = days.split(",").map(toDateKey_1.toUTCDateOnly);
            entries = await this.repo.findEntriesByDates(plan.id, selectedDates);
        }
        else {
            const selectedDate = (0, toDateKey_1.toUTCDateOnly)(date);
            entries = await this.repo.findEntriesByDates(plan.id, [selectedDate]);
        }
        return {
            week: (0, meal_plan_mapper_1.mapToWeekView)(entries, weekStart),
            aggregated: (0, aggregated_meal_plan_mapper_1.mapToAggregatedMealPlan)(entries),
        };
    }
    // =========================
    // INTERNAL: NORMALIZATION
    // =========================
    async normalizeAmount(entry) {
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
    async addEntry(input) {
        const dateObj = (0, toDateKey_1.toUTCDateOnly)(input.date);
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
    async addEntriesBulk(input) {
        if (!input.entries.length)
            return [];
        const { weekStart } = this.getPeriod(input.entries[0].date);
        let plan = await this.repo.findByFamilyAndWeek(input.familyId, weekStart);
        if (!plan) {
            plan = await this.repo.createPlan(input.familyId, weekStart);
        }
        const normalizedEntries = await Promise.all(input.entries.map(async (e) => {
            const amountInGrams = await this.normalizeAmount(e);
            return {
                mealPlanId: plan.id,
                date: (0, toDateKey_1.toUTCDateOnly)(e.date),
                userId: e.userId,
                mealTypeId: e.mealTypeId,
                recipeId: e.recipeId,
                productId: e.productId,
                amount: e.amount,
                unit: e.unit,
                amountInGrams,
            };
        }));
        return this.repo.createManyEntries(normalizedEntries);
    }
    // =========================
    // DELETE
    // =========================
    async removeEntry(entryId) {
        return this.repo.deleteEntry(entryId);
    }
    // =========================
    // UPDATE
    // =========================
    async toggleEntryStatus(id) {
        return this.repo.toggleStatus(id);
    }
    async toggleEntries(ids) {
        return this.repo.toggleMany(ids);
    }
}
exports.MealPlanService = MealPlanService;
