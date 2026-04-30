import { Router } from "express";
import { validateQuery } from "../../../middleware/validate-query";
import { validateParams } from "../../../middleware/validate-params";
import { withFamily } from "../../../middleware/with-family";
import { RecipeClientController } from "../../../modules/recipe/transport/client/recipe.client.controller";
import { RecipeClientSearchQuerySchema } from "../../../modules/recipe/transport/client/schemas/recipe-client-search.query.schema";
import { RecipeIdParamsSchema } from "../../../modules/recipe/transport/admin/schemas/recipe-id.params.schema";

export function RecipeClientRouter(controller: RecipeClientController) {
  const router = Router();

  router.use(withFamily);

  router.get(
    "/search",
    validateQuery(RecipeClientSearchQuerySchema),
    controller.search,
  );

  router.get(
    "/cookbook",
    validateQuery(RecipeClientSearchQuerySchema),
    controller.cookbook,
  );

  router.post(
    "/:id/favorite",
    validateParams(RecipeIdParamsSchema),
    controller.toggleFavorite,
  );

  return router;
}
