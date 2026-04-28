import { Router } from "express";
import { validateQuery } from "../../../middleware/validate-query";

import { ProductClientController } from "../../../modules/product/transport/client/product.client.controller";
import { ProductClientSearchQuerySchema } from "../../../modules/product/transport/client/schemas/product-client-search.query.schema";

export function ProductClientRouter(controller: ProductClientController) {
  const router = Router();

  router.get(
    "/search",
    validateQuery(ProductClientSearchQuerySchema),
    controller.search,
  );

  return router;
}
