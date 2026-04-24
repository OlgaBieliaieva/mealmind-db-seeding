"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandModule = createBrandModule;
const brand_repository_1 = require("./domain/brand.repository");
const brand_service_1 = require("./application/brand.service");
const brand_controller_1 = require("./transport/brand.controller");
const brand_routes_1 = require("../../routes/v1/admin/brand.routes");
function createBrandModule(prisma) {
    const repo = new brand_repository_1.BrandRepository(prisma);
    const service = new brand_service_1.BrandService(repo);
    const controller = new brand_controller_1.BrandController(service);
    const adminRouter = (0, brand_routes_1.BrandRouter)(controller);
    return {
        adminRouter,
    };
}
