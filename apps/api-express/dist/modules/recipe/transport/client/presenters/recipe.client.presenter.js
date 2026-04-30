"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentRecipeListItemInMealPlanClient = presentRecipeListItemInMealPlanClient;
function presentRecipeListItemInMealPlanClient(recipe) {
    return {
        id: recipe.id,
        type: "recipe",
        name: recipe.title,
        photoUrl: recipe.photoUrl ?? undefined,
        totalTime: (recipe.prepTimeMin ?? 0) + (recipe.cookTimeMin ?? 0),
        difficulty: recipe.difficulty ?? undefined,
        categoryCode: recipe.recipeType?.code,
        portions: recipe.baseServings,
        totalWeight: recipe.baseOutputWeightG,
        unit: "g",
    };
}
