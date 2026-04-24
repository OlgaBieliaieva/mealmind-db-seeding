"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanRepository = void 0;
const client_1 = require("@prisma/client");
const meal_plan_types_1 = require("../transport/client/types/meal-plan.types");
class MealPlanRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // =========================
    // HELPERS
    // =========================
    startOfDay(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    nextDay(date) {
        const d = new Date(date);
        d.setDate(d.getDate() + 1);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    async getRecipe(id) {
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
    async findByFamilyAndWeek(familyId, weekStart) {
        return this.prisma.mealPlan.findFirst({
            where: {
                familyId,
                weekStart: {
                    equals: weekStart,
                },
            },
        });
    }
    async createPlan(familyId, weekStart) {
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
    async findEntries(planId) {
        return this.prisma.mealEntry.findMany({
            where: {
                mealPlanId: planId,
            },
            include: meal_plan_types_1.mealEntryInclude,
        });
    }
    async createEntry(data) {
        return this.prisma.mealEntry.create({
            data: {
                ...data,
                date: this.startOfDay(data.date),
            },
        });
    }
    async deleteEntry(id) {
        return this.prisma.mealEntry.delete({
            where: { id },
        });
    }
    // =========================
    // STATUS
    // =========================
    async toggleStatus(id) {
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
                status: entry.status === client_1.MealEntryStatus.prepared
                    ? client_1.MealEntryStatus.planned
                    : client_1.MealEntryStatus.prepared,
            },
        });
    }
    async toggleMany(ids) {
        const entries = await this.prisma.mealEntry.findMany({
            where: { id: { in: ids } },
            select: { id: true, status: true },
        });
        if (!entries.length)
            return;
        const updates = entries.map((e) => this.prisma.mealEntry.update({
            where: { id: e.id },
            data: {
                status: e.status === client_1.MealEntryStatus.prepared
                    ? client_1.MealEntryStatus.planned
                    : client_1.MealEntryStatus.prepared,
            },
        }));
        await this.prisma.$transaction(updates);
    }
}
exports.MealPlanRepository = MealPlanRepository;
