"use strict";
// cuisine.module.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCuisineModule = createCuisineModule;
const cuisine_repository_1 = require("./domain/cuisine.repository");
const cuisine_service_1 = require("./application/cuisine.service");
const cuisine_admin_controller_1 = require("./transport/admin/cuisine.admin.controller");
const cuisine_routes_1 = require("../../routes/v1/admin/cuisine.routes");
function createCuisineModule(prisma) {
    const repo = new cuisine_repository_1.CuisineRepository(prisma);
    const service = new cuisine_service_1.CuisineService(repo);
    const controller = new cuisine_admin_controller_1.CuisineAdminController(service);
    const adminRouter = (0, cuisine_routes_1.CuisineAdminRouter)(controller);
    return {
        adminRouter,
    };
}
