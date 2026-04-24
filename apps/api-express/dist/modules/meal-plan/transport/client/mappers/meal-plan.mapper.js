"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToWeekView = mapToWeekView;
const toDateKey_1 = require("../../../../../shared/helpers/toDateKey");
// =========================
// HELPERS
// =========================
function getEntryType(e) {
    return e.recipe ? "recipe" : "product";
}
function mapUser(u) {
    return {
        id: u.id,
        firstName: u.firstName,
        sex: u.sex,
        avatarUrl: u.avatarUrl,
    };
}
// =========================
// MAPPER
// =========================
function mapToWeekView(entries, weekStart) {
    // =========================
    // GROUP BY DATE
    // =========================
    const entriesByDate = new Map();
    for (const e of entries) {
        const key = (0, toDateKey_1.toDateKey)(e.date);
        if (!entriesByDate.has(key)) {
            entriesByDate.set(key, []);
        }
        entriesByDate.get(key).push(e);
    }
    // =========================
    // BUILD DAYS
    // =========================
    const days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        const dateStr = (0, toDateKey_1.toDateKey)(d);
        const dayEntries = entriesByDate.get(dateStr) ?? [];
        // =========================
        // GROUP BY MEAL TYPE
        // =========================
        const mealsMap = new Map();
        for (const entry of dayEntries) {
            if (!mealsMap.has(entry.mealTypeId)) {
                mealsMap.set(entry.mealTypeId, []);
            }
            mealsMap.get(entry.mealTypeId).push(entry);
        }
        // =========================
        // BUILD MEALS
        // =========================
        const meals = Array.from(mealsMap.entries())
            .sort(([, a], [, b]) => {
            const orderA = a[0]?.mealType.orderIndex ?? 0;
            const orderB = b[0]?.mealType.orderIndex ?? 0;
            return orderA - orderB;
        })
            .map(([mealTypeId, mealEntries]) => {
            const first = mealEntries[0];
            return {
                mealTypeId,
                mealTypeName: first?.mealType.nameUa ?? "",
                entries: mealEntries
                    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                    .map((e) => {
                    const isRecipe = !!e.recipe;
                    return {
                        id: e.id,
                        // 🔥 ФІКС ТИПУ
                        type: getEntryType(e),
                        // INPUT
                        amount: e.amount,
                        // NORMALIZED
                        amountInGrams: e.amountInGrams,
                        // 🔥 ОБОВ'ЯЗКОВО
                        unit: isRecipe ? "g" : e.product.unit,
                        // USER
                        user: mapUser(e.user),
                        // RECIPE
                        recipe: isRecipe
                            ? {
                                id: e.recipe.id,
                                title: e.recipe.title,
                                baseServings: e.recipe.baseServings,
                                baseOutputWeightG: e.recipe.baseOutputWeightG,
                            }
                            : undefined,
                        // PRODUCT
                        product: !isRecipe
                            ? {
                                id: e.product.id,
                                nameUa: e.product.nameUa,
                                unit: e.product.unit,
                            }
                            : undefined,
                    };
                }),
            };
        });
        return {
            date: dateStr,
            meals,
        };
    });
    // =========================
    // WEEK META
    // =========================
    const start = (0, toDateKey_1.toDateKey)(weekStart);
    const endDate = new Date(weekStart);
    endDate.setDate(endDate.getDate() + 6);
    const end = (0, toDateKey_1.toDateKey)(endDate);
    return {
        week: {
            start,
            end,
        },
        days,
    };
}
