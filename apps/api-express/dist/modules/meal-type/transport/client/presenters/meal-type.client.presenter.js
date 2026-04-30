"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentMealTypeClient = presentMealTypeClient;
function presentMealTypeClient(mt) {
    return {
        id: mt.id,
        code: mt.code,
        name: mt.nameUa,
    };
}
