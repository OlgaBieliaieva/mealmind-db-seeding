"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentCuisine = presentCuisine;
exports.presentCuisineList = presentCuisineList;
function presentCuisine(cuisine) {
    return {
        id: cuisine.id,
        code: cuisine.code,
        name: {
            en: cuisine.nameEn,
            ua: cuisine.nameUa,
        },
    };
}
function presentCuisineList(cuisines) {
    return cuisines.map(presentCuisine);
}
