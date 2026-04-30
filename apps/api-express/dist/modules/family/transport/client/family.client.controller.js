"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyClientController = void 0;
const family_client_presenter_1 = require("./presenters/family.client.presenter");
class FamilyClientController {
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
    getMembers = async (req, res, next) => {
        try {
            const { familyId } = req.context;
            const users = await this.service.getMembers(familyId);
            res.json(users.map(family_client_presenter_1.presentFamilyMember));
        }
        catch (e) {
            next(e);
        }
    };
}
exports.FamilyClientController = FamilyClientController;
