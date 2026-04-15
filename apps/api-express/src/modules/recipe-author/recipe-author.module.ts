import { PrismaClient } from "@prisma/client";

import { RecipeAuthorRepository } from "./domain/recipe-author.repository";
import { RecipeAuthorService } from "./application/recipe-author.service";
import { RecipeAuthorController } from "./transport/recipe-author.controller";
import { RecipeAuthorRouter } from "../../routes/v1/admin/recipe-author.routes";

export function createRecipeAuthorModule(prisma: PrismaClient) {
  const repo = new RecipeAuthorRepository(prisma);
  const service = new RecipeAuthorService(repo);
  const controller = new RecipeAuthorController(service);

  const adminRouter = RecipeAuthorRouter(controller);

  return {
    adminRouter,
  };
}
