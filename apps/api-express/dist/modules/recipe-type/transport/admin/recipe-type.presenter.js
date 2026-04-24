"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentRecipeType = presentRecipeType;
exports.presentRecipeTypeList = presentRecipeTypeList;
function presentRecipeType(recipeType) {
    return {
        id: recipeType.id,
        code: recipeType.code,
        name: {
            en: recipeType.nameEn,
            ua: recipeType.nameUa,
        },
    };
}
function presentRecipeTypeList(recipeTypes) {
    return recipeTypes.map(presentRecipeType);
}
