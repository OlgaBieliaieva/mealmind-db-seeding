"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFamilyModule = createFamilyModule;
const family_repository_1 = require("./domain/family.repository");
const family_service_1 = require("./application/family.service");
const family_controller_1 = require("./transport/client/family.controller");
const family_routes_1 = require("../../routes/v1/client/family.routes");
function createFamilyModule(prisma) {
    const repo = new family_repository_1.FamilyRepository(prisma);
    const service = new family_service_1.FamilyService(repo);
    const controller = new family_controller_1.FamilyController(service);
    const router = (0, family_routes_1.FamilyRouter)(controller);
    return {
        router,
    };
}
