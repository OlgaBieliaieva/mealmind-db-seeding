

import { Router } from "express";
import { NutrientController } from "../../../modules/nutrient/transport/nutrient.controller";

export function NutrientRouter(controller: NutrientController) {
  const router = Router();

  router.get("/", controller.getAll);

  return router;
}