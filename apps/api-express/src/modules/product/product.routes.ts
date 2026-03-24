import { Router } from "express";
import { ProductController } from "./product.controller";

export function createProductRouter(controller: ProductController) {
  const router = Router();

  router.get("/:id", controller.getDetails);

  return router;
}
