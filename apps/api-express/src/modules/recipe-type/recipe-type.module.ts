import { PrismaClient } from "@prisma/client";

import { RecipeTypeRepository } from "./domain/recipe-type.repository";
import { RecipeTypeService } from "./application/recipe-type.service";
import { RecipeTypeAdminController } from "./transport/admin/recipe-type.admin.controller";

import { RecipeTypeAdminRouter } from "../../routes/v1/admin/recipe-type.routes";

export function createRecipeTypeModule(prisma: PrismaClient) {
  const repo = new RecipeTypeRepository(prisma);
  const service = new RecipeTypeService(repo);
  const controller = new RecipeTypeAdminController(service);

  const adminRouter = RecipeTypeAdminRouter(controller);

  return {
    adminRouter,
  };
}
