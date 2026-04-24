"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMealPlanModule = createMealPlanModule;
const meal_plan_repository_1 = require("./domain/meal-plan.repository");
const meal_plan_service_1 = require("./application/meal-plan.service");
const meal_plan_controller_1 = require("./transport/client/meal-plan.controller");
const meal_plan_routes_1 = require("../../routes/v1/client/meal-plan.routes");
function createMealPlanModule(prisma) {
    const repo = new meal_plan_repository_1.MealPlanRepository(prisma);
    const service = new meal_plan_service_1.MealPlanService(repo);
    const controller = new meal_plan_controller_1.MealPlanController(service);
    const router = (0, meal_plan_routes_1.MealPlanRouter)(controller);
    return {
        router,
    };
}
