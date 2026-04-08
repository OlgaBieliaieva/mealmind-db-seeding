import { Router } from "express";
import { RecipeTypeAdminController } from "../../../modules/recipe-type/transport/admin/recipe-type.admin.controller";

export function RecipeTypeAdminRouter(controller: RecipeTypeAdminController) {
  const router = Router();

  router.get("/", controller.getAll);

  return router;
}
