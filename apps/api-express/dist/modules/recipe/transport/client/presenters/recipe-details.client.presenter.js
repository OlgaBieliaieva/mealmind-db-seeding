"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentRecipeDetails = presentRecipeDetails;
const nutrient_ui_map_1 = require("../../../../nutrient/transport/client/mappers/nutrient-ui-map");
function presentRecipeDetails(recipe) {
    const macros = mapMacros(recipe.nutrients, recipe.baseOutputWeightG);
    return {
        id: recipe.id,
        name: recipe.title,
        description: recipe.description,
        fullDescription: recipe.fullDescription,
        photoUrl: recipe.photoUrl ?? undefined,
        prepTime: recipe.prepTimeMin,
        cookTime: recipe.cookTimeMin,
        totalTime: (recipe.prepTimeMin ?? 0) + (recipe.cookTimeMin ?? 0),
        baseServings: recipe.baseServings,
        baseServingWeightG: recipe.baseServings && recipe.baseServings > 0
            ? recipe.baseOutputWeightG / recipe.baseServings
            : 0,
        difficulty: recipe.difficulty ?? undefined,
        categoryCode: recipe.recipeType?.code,
        categoryName: recipe.recipeType?.nameUa,
        author: recipe.author
            ? {
                name: recipe.author.displayName,
                bio: recipe.author.bio ?? undefined,
                avatarUrl: recipe.author.avatarUrl ?? undefined,
                profileUrl: recipe.author.profileUrl ?? undefined,
                links: recipe.author.links?.map((l) => ({
                    type: l.type,
                    url: l.url,
                })),
            }
            : undefined,
        cuisines: recipe.cuisines.map((c) => ({
            id: c.cuisine.id,
            name: c.cuisine.nameUa,
        })),
        ingredients: recipe.ingredients
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((i) => ({
            id: i.id,
            name: i.product.nameUa,
            quantity: i.quantityG,
            unit: "г", // 🔥 поки просто g
            isOptional: i.isOptional,
        })),
        steps: recipe.steps
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map((s) => ({
            id: s.id,
            stepNumber: s.stepNumber,
            instruction: s.instruction,
            timerSec: s.timerSec ?? undefined,
        })),
        nutrients: recipe.nutrients.map((n) => ({
            code: n.nutrient.code,
            name: n.nutrient.nameUa,
            value: recipe.baseOutputWeightG > 0
                ? (n.valueTotal / recipe.baseOutputWeightG) * 100
                : 0,
            unit: n.unit ?? "g",
            group: n.nutrient.nutrientGroup,
            uiGroup: (0, nutrient_ui_map_1.mapToUINutrientGroup)(n.nutrient.code, n.nutrient.nutrientGroup),
            sortOrder: n.nutrient.sortOrder,
        })),
        macros,
        isFavorite: (recipe.favorites?.length ?? 0) > 0,
        videos: recipe.videos?.map((v) => ({
            id: v.id,
            title: v.title ?? undefined,
            thumbnailUrl: v.thumbnailUrl ?? undefined,
            durationSec: v.durationSec ?? undefined,
            platform: v.platform,
            url: v.url,
            author: v.author
                ? {
                    name: v.author.displayName,
                }
                : undefined,
        })),
    };
}
function mapMacros(nutrients, totalWeight) {
    let calories = 0;
    let proteins = 0;
    let fats = 0;
    let carbs = 0;
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
