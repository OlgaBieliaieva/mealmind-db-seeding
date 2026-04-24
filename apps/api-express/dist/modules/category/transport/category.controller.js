"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
class CategoryController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const categories = await this.service.getAll();
            res.json(categories);
        }
        catch (e) {
            next(e);
        }
    };
}
exports.CategoryController = CategoryController;
