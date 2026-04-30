import { Router } from "express";
import { withFamily } from "../../../middleware/with-family";
import { validateQuery } from "../../../middleware/validate-query";
import { validateParams } from "../../../middleware/validate-params";
import { ProductClientController } from "../../../modules/product/transport/client/product.client.controller";
import { ProductClientSearchQuerySchema } from "../../../modules/product/transport/client/schemas/product-client-search.query.schema";
import { ProductIdParamsSchema } from "../../../modules/product/transport/shared/schemas/product-id.params.schema";

export function ProductClientRouter(controller: ProductClientController) {
  const router = Router();

  router.use(withFamily);

  router.get(
    "/search",
    validateQuery(ProductClientSearchQuerySchema),
    controller.search,
  );

  router.post(
    "/:id/favorite",
    validateParams(ProductIdParamsSchema),
    controller.toggleFavorite,
  );

  return router;
}
