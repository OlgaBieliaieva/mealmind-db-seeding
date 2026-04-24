"use strict";
// modules/nutrient/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNutrientModule = createNutrientModule;
const nutrient_repository_1 = require("./domain/nutrient.repository");
const nutrient_controller_1 = require("./transport/nutrient.controller");
const nutrient_routes_1 = require("../../routes/v1/admin/nutrient.routes");
function createNutrientModule(prisma) {
    const query = new nutrient_repository_1.NutrientQuery(prisma);
    const controller = new nutrient_controller_1.NutrientController(query);
    return {
        adminRouter: (0, nutrient_routes_1.NutrientRouter)(controller),
    };
}
