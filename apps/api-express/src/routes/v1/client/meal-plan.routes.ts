import { Router } from "express";
import { validateBody } from "../../../middleware/validate-body";
import { validateQuery } from "../../../middleware/validate-query";
import { validateParams } from "../../../middleware/validate-params";
import { withFamily } from "../../../middleware/with-family";

import { MealPlanController } from "../../../modules/meal-plan/transport/client/meal-plan.controller";

import { MealPlanQuerySchema } from "../../../modules/meal-plan/transport/client/schemas/meal-plan.query.schema";
import {
  MealEntryCreateSchema,
  MealEntriesBulkCreateSchema,
} from "../../../modules/meal-plan/transport/client/schemas/meal-entry.create.schema";
import { MealEntryParamsSchema } from "../../../modules/meal-plan/transport/client/schemas/meal-entry.params.schema";

export function MealPlanRouter(controller: MealPlanController) {
  const router = Router();

  router.use(withFamily);

  // =========================
  // GET PLAN
  // =========================

  router.get("/", validateQuery(MealPlanQuerySchema), controller.getPlan);

  // =========================
  // CREATE ENTRY
  // =========================

  router.post(
    "/entries",
    validateBody(MealEntryCreateSchema),
    controller.createEntry,
  );

  router.post(
    "/entries/bulk",
    validateBody(MealEntriesBulkCreateSchema),
    controller.createEntriesBulk,
  );

  // =========================
  // UPDATE ENTRY
  // =========================

  router.patch(
    "/entries/:id/toggle",
    validateParams(MealEntryParamsSchema),
    controller.toggleStatus,
  );

  router.patch(
    "/entries/toggle-bulk",

    controller.toggleBulk,
  );

  // =========================
  // DELETE ENTRY
  // =========================

  router.delete(
    "/entries/:id",
    validateParams(MealEntryParamsSchema),
    controller.deleteEntry,
  );

  return router;
}
