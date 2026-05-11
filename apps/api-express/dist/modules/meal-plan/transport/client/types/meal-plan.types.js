"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealEntryInclude = void 0;
exports.mealEntryInclude = {
    mealType: {
        select: {
            id: true,
            nameUa: true,
            orderIndex: true,
        },
    },
    user: {
        select: {
            id: true,
            firstName: true,
            sex: true,
            avatarUrl: true,
        },
    },
    recipe: {
        select: {
            id: true,
            title: true,
            photoUrl: true,
            difficulty: true,
            recipeTypeId: true,
            baseServings: true,
            baseOutputWeightG: true,
            prepTimeMin: true,
            cookTimeMin: true,
            recipeType: {
                select: {
                    id: true,
                    code: true,
                    nameUa: true,
                },
            },
        },
    },
    product: {
        select: {
            id: true,
            nameUa: true,
            unit: true,
            category: {
                select: {
                    id: true,
                    nameEn: true,
                    nameUa: true,
                },
            },
        },
    },
};
