"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentProductListItemClient = presentProductListItemClient;
function presentProductListItemClient(product) {
    return {
        id: product.id,
        type: "product",
        name: product.nameUa,
        photoUrl: product.photos?.[0]?.url,
        unit: product.unit,
    };
}
