import { Router } from "express";
import { CategoryController } from "../../../modules/category/transport/category.controller";

export function CategoryRouter(controller: CategoryController) {
  const router = Router();

  router.get("/", controller.getAll);

  return router;
}
