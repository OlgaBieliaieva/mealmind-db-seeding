"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanRouter = MealPlanRouter;
const express_1 = require("express");
const validate_body_1 = require("../../../middleware/validate-body");
const validate_query_1 = require("../../../middleware/validate-query");
const validate_params_1 = require("../../../middleware/validate-params");
const with_family_1 = require("../../../middleware/with-family");
const meal_plan_query_schema_1 = require("../../../modules/meal-plan/transport/client/schemas/meal-plan.query.schema");
const meal_entry_create_schema_1 = require("../../../modules/meal-plan/transport/client/schemas/meal-entry.create.schema");
const meal_entry_params_schema_1 = require("../../../modules/meal-plan/transport/client/schemas/meal-entry.params.schema");
function MealPlanRouter(controller) {
    const router = (0, express_1.Router)();
    router.use(with_family_1.withFamily);
    // =========================
    // GET PLAN
    // =========================
    router.get("/", (0, validate_query_1.validateQuery)(meal_plan_query_schema_1.MealPlanQuerySchema), controller.getPlan);
    // =========================
    // CREATE ENTRY
    // =========================
    router.post("/entries", (0, validate_body_1.validateBody)(meal_entry_create_schema_1.MealEntryCreateSchema), controller.createEntry);
    // =========================
    // UPDATE ENTRY
    // =========================
    router.patch("/entries/:id/toggle", (0, validate_params_1.validateParams)(meal_entry_params_schema_1.MealEntryParamsSchema), controller.toggleStatus);
    router.patch("/entries/toggle-bulk", controller.toggleBulk);
    // =========================
    // DELETE ENTRY
    // =========================
    router.delete("/entries/:id", (0, validate_params_1.validateParams)(meal_entry_params_schema_1.MealEntryParamsSchema), controller.deleteEntry);
    return router;
}
