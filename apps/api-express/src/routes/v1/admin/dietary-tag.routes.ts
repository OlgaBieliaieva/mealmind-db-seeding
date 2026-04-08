import { Router } from "express";
import { DietaryTagAdminController } from "../../../modules/dietary-tag/transport/admin/dietary-tag.admin.controller";

export function DietaryTagAdminRouter(controller: DietaryTagAdminController) {
  const router = Router();

  router.get("/", controller.getAll);

  return router;
}
