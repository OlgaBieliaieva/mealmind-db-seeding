import { PrismaClient } from "@prisma/client";

import { RecipeAdminRouter } from "../../routes/v1/admin/recipe.routes";
import { RecipeRepository } from "./domain/recipe.repository";
import { RecipeService } from "./application/recipe.service";

import { RecipeAdminController } from "./transport/admin/recipe.admin.controller";

import { RecipeSearchQuery } from "./domain/queries/recipe-search.query";

export function createRecipeModule(prisma: PrismaClient) {
  const repo = new RecipeRepository(prisma);
  const searchQuery = new RecipeSearchQuery(prisma);

  const service = new RecipeService(repo, searchQuery);

  const controller = new RecipeAdminController(service);

  const adminRouter = RecipeAdminRouter(controller);

  return {
    adminRouter,
  };
}
