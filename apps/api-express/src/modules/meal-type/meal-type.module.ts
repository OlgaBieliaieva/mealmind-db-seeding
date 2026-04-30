import { PrismaClient } from "@prisma/client";
import { MealTypeRepository } from "./domain/meal-type.repository";
import { MealTypeService } from "./application/meal-type.service";
import { MealTypeClientController } from "./transport/client/meal-type.client.controller";
import { MealTypeClientRouter } from "../../routes/v1/client/meal-type.routes";

export function createMealTypeModule(prisma: PrismaClient) {
  const repo = new MealTypeRepository(prisma);
  const service = new MealTypeService(repo);
  const controller = new MealTypeClientController(service);

  const clientRouter = MealTypeClientRouter(controller);

  return {
    clientRouter,
  };
}
