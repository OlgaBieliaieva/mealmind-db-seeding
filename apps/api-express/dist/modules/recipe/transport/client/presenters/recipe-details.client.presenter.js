"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentRecipeDetails = presentRecipeDetails;
const nutrient_ui_map_1 = require("../../../../nutrient/transport/client/mappers/nutrient-ui-map");
function presentRecipeDetails(recipe) {
    const macros = mapMacros(recipe.nutrients, recipe.baseOutputWeightG);
    return {
        id: recipe.id,
        // 🔹 BASIC
        name: recipe.title,
        description: recipe.description ?? undefined,
        fullDescription: recipe.fullDescription ?? undefined,
        photoUrl: recipe.photoUrl ?? undefined,
        // 🔹 TIME + PORTIONS
        prepTime: recipe.prepTimeMin ?? undefined,
        cookTime: recipe.cookTimeMin ?? undefined,
        totalTime: (recipe.prepTimeMin ?? 0) + (recipe.cookTimeMin ?? 0),
        baseServings: recipe.baseServings ?? undefined,
        baseOutputWeightG: recipe.baseOutputWeightG,
        baseServingWeightG: recipe.baseServings && recipe.baseServings > 0
            ? recipe.baseOutputWeightG / recipe.baseServings
            : 0,
        difficulty: recipe.difficulty ?? undefined,
        // 🔹 CATEGORY
        categoryCode: recipe.recipeType?.code,
        categoryName: recipe.recipeType?.nameUa,
        // 🔹 AUTHOR
        author: recipe.author
            ? {
                name: recipe.author.displayName,
                bio: recipe.author.bio ?? undefined,
                avatarUrl: recipe.author.avatarUrl ?? undefined,
                profileUrl: recipe.author.profileUrl ?? undefined,
                links: recipe.author.links?.map(mapAuthorLink),
            }
            : undefined,
        // 🔹 CUISINES
        cuisines: recipe.cuisines.map((c) => ({
            id: c.cuisine.id,
            name: c.cuisine.nameUa,
        })),
        // 🔹 INGREDIENTS
        ingredients: recipe.ingredients.sort(sortByOrder).map(mapIngredient),
        // 🔹 STEPS
        steps: recipe.steps
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map(mapStep),
        // 🔹 NUTRIENTS
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
        isFavorite: Boolean(recipe.favorites?.length),
        // 🔹 VIDEOS
        videos: recipe.videos?.map(mapVideo) ?? [],
        // 🆕 🔹 SOURCES
        sources: recipe.sources?.map((s) => ({
            id: s.id,
            title: s.title ?? undefined,
            url: s.url,
            platform: s.platform ?? undefined,
        })),
        // 🆕 🔹 ORIGINAL RECIPE
        originalRecipe: recipe.originalRecipe
            ? {
                id: recipe.originalRecipe.id,
                title: recipe.originalRecipe.title,
                photoUrl: recipe.originalRecipe.photoUrl ?? undefined,
            }
            : undefined,
    };
}
function mapIngredient(i) {
    return {
        id: i.id,
        productId: i.product.id,
        name: i.product.nameUa,
        quantity: i.quantityG,
        unit: "г",
        isOptional: i.isOptional,
        category: {
            name: i.product.category.nameUa,
            code: normalizeCategoryCode(i.product.category.nameEn),
        },
        brand: i.product.brand
            ? {
                name: getBrandName(i.product.brand),
                country: i.product.brand.country ?? undefined,
            }
            : undefined,
    };
}
function mapStep(s) {
    return {
        id: s.id,
        stepNumber: s.stepNumber,
        instruction: s.instruction,
        timerSec: s.timerSec ?? undefined,
    };
}
function mapVideo(v) {
    return {
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
    };
}
function mapAuthorLink(l) {
    return {
        type: l.type,
        url: l.url,
    };
}
function sortByOrder(a, b) {
    return a.orderIndex - b.orderIndex;
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
function isUkrainianBrand(country) {
    if (!country)
        return false;
    const c = country.toLowerCase();
    return c === "ua" || c === "ukraine" || c === "україна";
}
function getBrandName(brand) {
    return isUkrainianBrand(brand.country) ? brand.nameUa : brand.nameEn;
}
function normalizeCategoryCode(nameEn) {
    return nameEn
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
}
