"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutrientController = void 0;
const nutrient_presenter_1 = require("./admin/presenters/nutrient.presenter");
class NutrientController {
    query;
    constructor(query) {
        this.query = query;
    }
    getAll = async (req, res, next) => {
        try {
            const nutrients = await this.query.getAll();
            res.json(nutrients.map(nutrient_presenter_1.presentNutrientReference));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.NutrientController = NutrientController;
