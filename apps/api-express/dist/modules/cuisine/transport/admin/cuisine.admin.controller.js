"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuisineAdminController = void 0;
const cuisine_presenter_1 = require("./cuisine.presenter");
class CuisineAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const cuisines = await this.service.getAll();
            res.json((0, cuisine_presenter_1.presentCuisineList)(cuisines));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.CuisineAdminController = CuisineAdminController;
