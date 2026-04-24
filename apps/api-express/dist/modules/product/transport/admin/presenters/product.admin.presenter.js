"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentProductListItem = presentProductListItem;
exports.presentProductDetailsAdmin = presentProductDetailsAdmin;
function presentProductListItem(product) {
    return {
        product_id: product.id,
        name_en: product.nameEn,
        name_ua: product.nameUa,
        type: product.type,
        category: product.category?.nameUa ?? null,
        brand: product.brand
            ? product.brand.country?.toLowerCase() === "україна"
                ? product.brand.nameUa
                : product.brand.nameEn
            : null,
        status: product.status,
        is_verified: product.isVerified,
    };
}
function presentProductDetailsAdmin(product) {
    return {
        id: product.id,
        name: {
            ua: product.nameUa,
            en: product.nameEn,
        },
        barcode: product.barcode,
        notes: product.notes,
        isVerified: product.isVerified,
        source: product.source,
        type: product.type,
        unit: product.unit,
        rawOrCooked: product.rawOrCookedDefault,
        status: product.status,
        category: {
            leafId: product.category.id,
            leafName: product.category.nameUa,
            rootId: product.category.parent?.id,
            rootName: product.category.parent?.nameUa,
        },
        brand: product.brand
            ? {
                id: product.brand.id,
                name: product.brand.country?.toLowerCase() === "україна"
                    ? product.brand.nameUa
                    : product.brand.nameEn,
            }
            : undefined,
        parent: product.parentProduct
            ? {
                id: product.parentProduct.id,
                name: product.parentProduct.nameUa,
            }
            : undefined,
        cookingFactors: {
            ediblePartPct: product.ediblePartPct ?? 0,
            cookingLossPct: product.cookingLossPct ?? 0,
            yieldFactor: product.yieldFactor ?? 1,
            inheritedFromGeneric: !!product.parentProductId,
        },
        nutrients: product.nutrients.map((n) => ({
            nutrientId: n.nutrientId,
            code: n.nutrient.code,
            name: n.nutrient.nameUa,
            value: n.valuePer100g,
            unit: n.unit,
        })),
        photos: product.photos.map((p) => ({
            id: p.id,
            url: p.url,
            type: p.photoType,
            isPrimary: false,
        })),
    };
}
