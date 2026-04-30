"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentProductListItemInSearchClient = presentProductListItemInSearchClient;
function mapProductMacros(nutrients) {
    let calories = 0;
    let proteins = 0;
    let fats = 0;
    let carbs = 0;
    for (const n of nutrients) {
        switch (n.nutrient.code) {
            case "energy_kcal":
                calories = n.valuePer100g;
                break;
            case "protein":
                proteins = n.valuePer100g;
                break;
            case "fat":
                fats = n.valuePer100g;
                break;
            case "carbohydrates":
                carbs = n.valuePer100g;
                break;
        }
    }
    return { calories, proteins, fats, carbs };
}
function presentProductListItemInSearchClient(product) {
    const { calories, proteins, fats, carbs } = mapProductMacros(product.nutrients);
    return {
        id: product.id,
        type: "product",
        name: product.nameUa,
        photoUrl: product.photos?.[0]?.url,
        categoryName: product.category.nameUa,
        categoryCode: normalizeCategoryCode(product.category.nameEn),
        brand: product.brand
            ? {
                name: getBrandName(product.brand),
                country: product.brand.country,
            }
            : null,
        calories,
        proteins,
        fats,
        carbs,
        isFavorite: product.favorites.length > 0,
    };
}
function isUkrainianBrand(country) {
    if (!country)
        return false;
    const normalized = country.toLowerCase();
    return (normalized === "ua" || normalized === "ukraine" || normalized === "україна");
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
