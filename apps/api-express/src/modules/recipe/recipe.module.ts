import { PrismaClient } from "@prisma/client";

import { RecipeAdminRouter } from "../../routes/v1/admin/recipe.routes";
import { RecipeRepository } from "./domain/recipe.repository";
import { RecipeService } from "./application/recipe.service";
import { RecipeClientRouter } from "../../routes/v1/client/recipe.routes";
import { RecipeAdminController } from "./transport/admin/recipe.admin.controller";
import { RecipeClientController } from "./transport/client/recipe.client.controller";
import { RecipeSearchQuery } from "./domain/queries/recipe-search.query";

export function createRecipeModule(prisma: PrismaClient) {
  const repo = new RecipeRepository(prisma);
  const searchQuery = new RecipeSearchQuery(prisma);

  const service = new RecipeService(repo, searchQuery);

  const adminController = new RecipeAdminController(service);
  const clientController = new RecipeClientController(service);

  return {
    adminRouter: RecipeAdminRouter(adminController),
    clientRouter: RecipeClientRouter(clientController),
  };
}
