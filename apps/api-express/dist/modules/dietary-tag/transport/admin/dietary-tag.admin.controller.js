"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietaryTagAdminController = void 0;
const dietary_tag_presenter_1 = require("./dietary-tag.presenter");
class DietaryTagAdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const tags = await this.service.getAll();
            res.json((0, dietary_tag_presenter_1.presentDietaryTagList)(tags));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.DietaryTagAdminController = DietaryTagAdminController;
