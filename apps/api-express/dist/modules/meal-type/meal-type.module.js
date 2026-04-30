"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMealTypeModule = createMealTypeModule;
const meal_type_repository_1 = require("./domain/meal-type.repository");
const meal_type_service_1 = require("./application/meal-type.service");
const meal_type_client_controller_1 = require("./transport/client/meal-type.client.controller");
const meal_type_routes_1 = require("../../routes/v1/client/meal-type.routes");
function createMealTypeModule(prisma) {
    const repo = new meal_type_repository_1.MealTypeRepository(prisma);
    const service = new meal_type_service_1.MealTypeService(repo);
    const controller = new meal_type_client_controller_1.MealTypeClientController(service);
    const clientRouter = (0, meal_type_routes_1.MealTypeClientRouter)(controller);
    return {
        clientRouter,
    };
}
