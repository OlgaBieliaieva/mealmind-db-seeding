"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentRecipeListItemInSearchClient = presentRecipeListItemInSearchClient;
function mapMacros(nutrients, totalWeight) {
    let calories;
    let proteins;
    let fats;
    let carbs;
    if (!totalWeight || totalWeight === 0) {
        return { calories, proteins, fats, carbs };
    }
    for (const n of nutrients) {
        const per100g = (n.valueTotal / totalWeight) * 100;
        switch (n.nutrient.code) {
            case "energy_kcal":
                calories = per100g;
                break;
            case "protein":
                proteins = per100g;
                break;
            case "fat":
                fats = per100g;
                break;
            case "carbohydrates":
                carbs = per100g;
                break;
        }
    }
    return { calories, proteins, fats, carbs };
}
function presentRecipeListItemInSearchClient(recipe) {
    const { calories, proteins, fats, carbs } = mapMacros(recipe.nutrients, recipe.baseOutputWeightG);
    return {
        id: recipe.id,
        type: "recipe",
        name: recipe.title,
        photoUrl: recipe.photoUrl ?? undefined,
        totalTime: (recipe.prepTimeMin ?? 0) + (recipe.cookTimeMin ?? 0),
        difficulty: recipe.difficulty ?? undefined,
        categoryCode: recipe.recipeType?.code,
        categoryName: recipe.recipeType?.nameUa,
        calories,
        proteins,
        fats,
        carbs,
        cuisines: recipe.cuisines.map((c) => ({
            id: c.cuisine.id,
            name: c.cuisine.nameUa,
        })),
        author: recipe.author
            ? {
                name: recipe.author.displayName,
                avatarUrl: recipe.author.avatarUrl ?? undefined,
            }
            : undefined,
        isFavorite: recipe.favorites.length > 0,
    };
}
