import { PrismaClient } from "@prisma/client";

import { MealPlanRepository } from "./domain/meal-plan.repository";
import { MealPlanService } from "./application/meal-plan.service";
import { MealPlanController } from "./transport/client/meal-plan.controller";
import { MealPlanRouter } from "../../routes/v1/client/meal-plan.routes";

export function createMealPlanModule(prisma: PrismaClient) {
  const repo = new MealPlanRepository(prisma);
  const service = new MealPlanService(repo);
  const controller = new MealPlanController(service);

  const router = MealPlanRouter(controller);

  return {
    router,
  };
}
