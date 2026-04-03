// recipe.module.ts

import { Router } from "express";
import { createRecipeAdminHandler } from "./transport/admin/recipe.admin.controller";

export function registerRecipeModule(router: Router) {
  router.post("/recipes", createRecipeAdminHandler);
}
