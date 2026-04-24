"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeTypeAdminController = void 0;
const recipe_type_presenter_1 = require("./recipe-type.presenter");
class RecipeTypeAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const data = await this.service.getAll();
            res.json((0, recipe_type_presenter_1.presentRecipeTypeList)(data));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.RecipeTypeAdminController = RecipeTypeAdminController;
