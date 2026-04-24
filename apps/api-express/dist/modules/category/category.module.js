"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryModule = createCategoryModule;
const category_repository_1 = require("./domain/category.repository");
const category_service_1 = require("./application/category.service");
const category_controller_1 = require("./transport/category.controller");
const category_routes_1 = require("../../routes/v1/admin/category.routes");
function createCategoryModule(prisma) {
    const repo = new category_repository_1.CategoryRepository(prisma);
    const service = new category_service_1.CategoryService(repo);
    const controller = new category_controller_1.CategoryController(service);
    const adminRouter = (0, category_routes_1.CategoryRouter)(controller);
    return {
        adminRouter,
    };
}
