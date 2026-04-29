import { Router } from "express";
import { MealTypeClientController } from "../../../modules/meal-type/transport/client/meal-type.client.controller";

export function MealTypeClientRouter(controller: MealTypeClientController) {
  const router = Router();

  router.get("/", controller.getAll);

  return router;
}
