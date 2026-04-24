"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandController = void 0;
class BrandController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const brands = await this.service.getAll();
            res.json(brands);
        }
        catch (e) {
            next(e);
        }
    };
}
exports.BrandController = BrandController;
