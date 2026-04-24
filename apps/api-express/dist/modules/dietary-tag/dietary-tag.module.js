"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDietaryTagModule = createDietaryTagModule;
const dietary_tag_repository_1 = require("./domain/dietary-tag.repository");
const dietary_tag_service_1 = require("./application/dietary-tag.service");
const dietary_tag_admin_controller_1 = require("./transport/admin/dietary-tag.admin.controller");
const dietary_tag_routes_1 = require("../../routes/v1/admin/dietary-tag.routes");
function createDietaryTagModule(prisma) {
    const repo = new dietary_tag_repository_1.DietaryTagRepository(prisma);
    const service = new dietary_tag_service_1.DietaryTagService(repo);
    const controller = new dietary_tag_admin_controller_1.DietaryTagAdminController(service);
    const adminRouter = (0, dietary_tag_routes_1.DietaryTagAdminRouter)(controller);
    return {
        adminRouter,
    };
}
