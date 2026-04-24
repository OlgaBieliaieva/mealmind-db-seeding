"use strict";
// SECTION ███ PRODUCT DOMAIN CONSTANTS ███
// WHY: системні значення, що використовуються у формах, схемах та UI
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_PHOTO_TYPE_VALUES = exports.PRODUCT_STATES_VALUES = exports.PRODUCT_UNITS_VALUES = exports.PRODUCT_TYPES_VALUES = exports.PRODUCT_PHOTO_TYPES = exports.PRODUCT_STATES = exports.PRODUCT_UNITS = exports.PRODUCT_TYPES = void 0;
// SECTION ━━ PRODUCT TYPES ━━━━━━━━━━━━━━━━━
exports.PRODUCT_TYPES = {
    GENERIC: "generic",
    BRANDED: "branded",
};
// SECTION ━━ PRODUCT UNITS ━━━━━━━━━━━━━━━━━
exports.PRODUCT_UNITS = {
    G: "g",
    ML: "ml",
    PCS: "pcs",
};
// SECTION ━━ PRODUCT STATES ━━━━━━━━━━━━━━━━
exports.PRODUCT_STATES = {
    RAW: "raw",
    COOKED: "cooked",
};
// SECTION ━━ PRODUCT PHOTO TYPES ━━━━━━━━━━━
exports.PRODUCT_PHOTO_TYPES = {
    PACKAGING: "packaging",
    INGREDIENTS: "ingredients",
    OTHER: "other",
};
exports.PRODUCT_TYPES_VALUES = Object.values(exports.PRODUCT_TYPES);
exports.PRODUCT_UNITS_VALUES = Object.values(exports.PRODUCT_UNITS);
exports.PRODUCT_STATES_VALUES = Object.values(exports.PRODUCT_STATES);
// export const PRODUCT_PHOTO_TYPE_VALUES = Object.values(
//   PRODUCT_PHOTO_TYPES,
// ) as readonly string[];
exports.PRODUCT_PHOTO_TYPE_VALUES = [
    exports.PRODUCT_PHOTO_TYPES.PACKAGING,
    exports.PRODUCT_PHOTO_TYPES.INGREDIENTS,
    exports.PRODUCT_PHOTO_TYPES.OTHER,
];
