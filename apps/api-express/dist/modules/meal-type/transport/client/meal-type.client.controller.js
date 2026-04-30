"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealTypeClientController = void 0;
const meal_type_client_presenter_1 = require("./presenters/meal-type.client.presenter");
class MealTypeClientController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (_req, res, next) => {
        try {
            const items = await this.service.getAll();
            res.json(items.map(meal_type_client_presenter_1.presentMealTypeClient));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.MealTypeClientController = MealTypeClientController;
