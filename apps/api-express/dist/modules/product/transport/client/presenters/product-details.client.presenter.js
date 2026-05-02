"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentProductDetails = presentProductDetails;
const nutrient_client_presenter_1 = require("../../../../nutrient/transport/client/presenters/nutrient.client.presenter");
function presentProductDetails(product) {
    const macros = mapMacros(product.nutrients);
    return {
        id: product.id,
        name: product.nameUa,
        photoUrl: pickPrimaryPhoto(product.photos),
        categoryName: product.category.nameUa,
        categoryCode: normalizeCategoryCode(product.category.nameEn),
        brand: product.brand
            ? {
                name: getBrandName(product.brand),
                country: product.brand.country ?? undefined,
            }
            : undefined,
        nutrients: product.nutrients.map(nutrient_client_presenter_1.presentNutrient),
        macros,
        isFavorite: (product.favorites?.length ?? 0) > 0,
    };
}
function mapMacros(nutrients) {
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
function pickPrimaryPhoto(photos) {
    if (!photos || photos.length === 0)
        return undefined;
    const packaging = photos.find((p) => p.photoType === "packaging");
    if (packaging)
        return packaging.url;
    return photos[0].url;
}
