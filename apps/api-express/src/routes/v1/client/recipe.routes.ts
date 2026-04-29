import { Router } from "express";
import { validateQuery } from "../../../middleware/validate-query";
import { withFamily } from "../../../middleware/with-family";
import { RecipeClientController } from "../../../modules/recipe/transport/client/recipe.client.controller";
import { RecipeClientSearchQuerySchema } from "../../../modules/recipe/transport/client/schemas/recipe-client-search.query.schema";

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

  return router;
}
