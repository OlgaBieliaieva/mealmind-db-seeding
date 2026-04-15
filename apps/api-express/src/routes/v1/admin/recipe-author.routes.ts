import { Router } from "express";
import { RecipeAuthorController } from "../../../modules/recipe-author/transport/recipe-author.controller";

export function RecipeAuthorRouter(controller: RecipeAuthorController) {
  const router = Router();

  router.get("/", controller.getAll);
  router.post("/", controller.create);

  return router;
}
