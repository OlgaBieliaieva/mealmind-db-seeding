import { Router } from "express";
import { validateQuery } from "../../../middleware/validate-query";
import { RecipeClientController } from "../../../modules/recipe/transport/client/recipe.client.controller";
import { RecipeClientSearchQuerySchema } from "../../../modules/recipe/transport/client/schemas/recipe-client-search.query.schema";

export function RecipeClientRouter(controller: RecipeClientController) {
  const router = Router();

  router.get(
    "/search",
    validateQuery(RecipeClientSearchQuerySchema),
    controller.search,
  );

  return router;
}
