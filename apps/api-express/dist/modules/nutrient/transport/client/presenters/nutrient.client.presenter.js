"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentNutrient = presentNutrient;
const nutrient_ui_map_1 = require("../mappers/nutrient-ui-map");
function presentNutrient(n) {
    return {
        code: n.nutrient.code,
        name: n.nutrient.nameUa,
        value: n.valuePer100g,
        unit: n.unit ?? "g",
        group: n.nutrient.nutrientGroup,
        sortOrder: n.nutrient.sortOrder,
        uiGroup: (0, nutrient_ui_map_1.mapToUINutrientGroup)(n.nutrient.code, n.nutrient.nutrientGroup),
    };
}
