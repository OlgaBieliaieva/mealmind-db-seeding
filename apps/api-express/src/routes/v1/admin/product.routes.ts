import { Router } from "express";
import { validateBody } from "../../../middleware/validate-body";
import { validateParams } from "../../../middleware/validate-params";
import { validateQuery } from "../../../middleware/validate-query";

import { AdminCreateProductSchema } from "../../../modules/product/transport/admin/schemas/product.create.schema";
import { AdminUpdateProductSchema } from "../../../modules/product/transport/admin/schemas/product.update.schema";
import { ProductIdParamsSchema } from "../../../modules/product/transport/shared/schemas/product-id.params.schema";
import { ProductPhotoParamsSchema } from "../../../modules/product/transport/admin/schemas/product-photo.params";
import { ProductSearchQuerySchema } from "../../../modules/product/transport/admin/schemas/product-search.query.schema";

import { ProductAdminController } from "../../../modules/product/transport/admin/product.admin.controller";

export function ProductAdminRouter(controller: ProductAdminController) {
  const router = Router();

  router.post("/", validateBody(AdminCreateProductSchema), controller.create);

  router.patch(
    "/:id",
    validateParams(ProductIdParamsSchema),
    validateBody(AdminUpdateProductSchema),
    controller.update,
  );

  // router.get("/", controller.search);

  router.get(
  "/search",
  validateQuery(ProductSearchQuerySchema),
  controller.search,
);

  router.get(
    "/:id",
    validateParams(ProductIdParamsSchema),
    controller.getDetails,
  );

  router.post(
    "/:id/activate",
    validateParams(ProductIdParamsSchema),
    controller.activate,
  );

  router.post(
    "/:id/archive",
    validateParams(ProductIdParamsSchema),
    controller.archive,
  );

  router.post(
    "/:id/restore",
    validateParams(ProductIdParamsSchema),
    controller.restore,
  );

  router.delete(
    "/:id/hard",
    validateParams(ProductIdParamsSchema),
    controller.hardDelete,
  );

  router.delete(
  "/:id/photos/:photoId",
  validateParams(ProductPhotoParamsSchema),
  controller.deletePhoto,
);

router.post(
  "/nutrients",
  controller.getNutrientsBatch,
);
  return router;
}
