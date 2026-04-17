import { Router } from "express";

import { validateBody } from "../../../middleware/validate-body";
import { validateParams } from "../../../middleware/validate-params";
import { validateQuery } from "../../../middleware/validate-query";

import { createRecipeSchema } from "../../../modules/recipe/transport/admin/schemas/create-recipe.schema";
import { RecipeIdParamsSchema } from "../../../modules/recipe/transport/admin/schemas/recipe-id.params.schema";
import { RecipeSearchQuerySchema } from "../../../modules/recipe/transport/admin/schemas/recipe-search.query.schema";

import { RecipeAdminController } from "../../../modules/recipe/transport/admin/recipe.admin.controller";

export function RecipeAdminRouter(controller: RecipeAdminController) {
  const router = Router();

  router.post("/", validateBody(createRecipeSchema), controller.create);

  router.get(
    "/search",
    validateQuery(RecipeSearchQuerySchema),
    controller.search,
  );

  router.get(
    "/:id",
    validateParams(RecipeIdParamsSchema),
    controller.getDetails,
  );

  router.patch(
    "/:id",
    validateParams(RecipeIdParamsSchema),
    validateBody(createRecipeSchema),
    controller.update,
  );

  router.post(
    "/:id/publish",
    validateParams(RecipeIdParamsSchema),
    controller.publish,
  );

  router.post(
    "/:id/archive",
    validateParams(RecipeIdParamsSchema),
    controller.archive,
  );

  router.post(
    "/:id/restore",
    validateParams(RecipeIdParamsSchema),
    controller.restore,
  );

  router.delete(
    "/:id/hard",
    validateParams(RecipeIdParamsSchema),
    controller.deleteHard,
  );

  return router;
}
