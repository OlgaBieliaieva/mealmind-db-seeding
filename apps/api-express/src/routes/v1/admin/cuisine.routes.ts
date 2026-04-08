import { Router } from "express";
import { CuisineAdminController } from "../../../modules/cuisine/transport/admin/cuisine.admin.controller";

export function CuisineAdminRouter(controller: CuisineAdminController) {
  const router = Router();

  router.get("/", controller.getAll);

  return router;
}
