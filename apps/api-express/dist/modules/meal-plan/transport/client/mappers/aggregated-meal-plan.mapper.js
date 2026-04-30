"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToAggregatedMealPlan = mapToAggregatedMealPlan;
function mapToAggregatedMealPlan(entries) {
    const map = new Map();
    for (const entry of entries) {
        const isRecipe = !!entry.recipe;
        const key = isRecipe
            ? `recipe-${entry.recipe.id}`
            : `product-${entry.product.id}`;
        if (!map.has(key)) {
            map.set(key, {
                id: isRecipe ? entry.recipe.id : entry.product.id,
                type: isRecipe ? "recipe" : "product",
                categoryId: entry.recipe?.recipeTypeId ?? undefined,
                categoryCode: entry.recipe?.recipeType?.code,
                categoryName: entry.recipe?.recipeType?.nameUa,
                photoUrl: isRecipe ? (entry.recipe.photoUrl ?? undefined) : undefined,
                totalTime: isRecipe
                    ? (entry.recipe.prepTimeMin ?? 0) + (entry.recipe.cookTimeMin ?? 0)
                    : undefined,
                difficulty: isRecipe
                    ? (entry.recipe.difficulty ?? undefined)
                    : undefined,
                name: isRecipe ? entry.recipe.title : entry.product.nameUa,
                totalWeight: 0,
                portions: 0,
                // 🔥 FIX: users типізуємо явно
                users: [],
                mealTypeId: entry.mealTypeId,
                mealTypeName: entry.mealType.nameUa,
                // 🔥 FIX: типізуємо
                entryIds: [],
                // 🔥 NEW
                unit: isRecipe ? "g" : entry.product.unit,
                isPrepared: false,
                preparedCount: 0,
                totalCount: 0,
            });
        }
        const item = map.get(key);
        // =========================
        // PORTIONS
        // =========================
        item.portions += 1;
        // =========================
        // WEIGHT
        // =========================
        const weight = entry.amountInGrams ?? 0; // 🔥 safety
        item.totalWeight += weight;
        // =========================
        // USERS
        // =========================
        if (!item.users.find((u) => u.id === entry.user.id)) {
            item.users.push({
                id: entry.user.id,
                firstName: entry.user.firstName,
                sex: entry.user.sex,
                avatarUrl: entry.user.avatarUrl,
            });
        }
        // =========================
        // ENTRY IDS
        // =========================
        item.entryIds.push(entry.id);
        // =========================
        // STATUS
        // =========================
        item.totalCount += 1;
        if (entry.status === "prepared") {
            item.preparedCount += 1;
        }
    }
    const items = Array.from(map.values()).map(({ preparedCount, totalCount, ...rest }) => ({
        ...rest,
        isPrepared: preparedCount === totalCount,
    }));
    // =========================
    // SUMMARY
    // =========================
    const totalItems = items.length;
    const preparedItems = items.filter((i) => i.isPrepared).length;
    const progress = totalItems === 0 ? 0 : preparedItems / totalItems;
    return {
        summary: {
            totalItems,
            preparedItems,
            progress,
        },
        items,
    };
}
