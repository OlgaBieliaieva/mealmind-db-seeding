import { Router } from "express";
import { validateBody } from "../../../middleware/validate-body";
import { validateParams } from "../../../middleware/validate-params";
import { ProductIdParamsSchema } from "../../../modules/product/transport/shared/schemas/product-id.params.schema";
import { AdminCreateProductSchema } from "../../../modules/product/transport/admin/schemas/product.create.schema";
import { ProductAdminController } from "../../../modules/product/transport/admin/product.admin.controller";

export function ProductAdminRouter(controller: ProductAdminController) {
  const router = Router();

  router.post("/", validateBody(AdminCreateProductSchema), controller.create);
  router.get(
    "/:id",
    validateParams(ProductIdParamsSchema),
    controller.getDetails,
  );

  return router;
}
