"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyController = void 0;
class FamilyController {
    service;
    constructor(service) {
        this.service = service;
    }
    getFamily = async (req, res, next) => {
        try {
            const { familyId } = req.context;
            const result = await this.service.getFamily(familyId);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    };
}
exports.FamilyController = FamilyController;
