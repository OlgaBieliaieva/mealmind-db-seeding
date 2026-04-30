"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFamilyModule = createFamilyModule;
const family_repository_1 = require("./domain/family.repository");
const family_service_1 = require("./application/family.service");
const family_client_controller_1 = require("./transport/client/family.client.controller");
const family_routes_1 = require("../../routes/v1/client/family.routes");
function createFamilyModule(prisma) {
    const repo = new family_repository_1.FamilyRepository(prisma);
    const service = new family_service_1.FamilyService(repo);
    const controller = new family_client_controller_1.FamilyClientController(service);
    const clientRouter = (0, family_routes_1.FamilyClientRouter)(controller);
    return {
        clientRouter,
    };
}
