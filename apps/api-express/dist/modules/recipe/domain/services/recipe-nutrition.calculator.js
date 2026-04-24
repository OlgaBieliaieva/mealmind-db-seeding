"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeNutritionCalculator = void 0;
class RecipeNutritionCalculator {
    static calculate(ingredients) {
        const totals = new Map();
        for (const ingredient of ingredients) {
            for (const n of ingredient.product.nutrients) {
                const value = (n.valuePer100g * ingredient.quantityG) / 100;
                if (!totals.has(n.nutrientId)) {
                    totals.set(n.nutrientId, {
                        value: 0,
                        unit: n.unit ?? "",
                    });
                }
                totals.get(n.nutrientId).value += value;
            }
        }
        return Array.from(totals.entries()).map(([nutrientId, v]) => ({
            nutrientId,
            valueTotal: v.value,
            unit: v.unit,
        }));
    }
}
exports.RecipeNutritionCalculator = RecipeNutritionCalculator;
