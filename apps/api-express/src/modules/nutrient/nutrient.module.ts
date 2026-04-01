// modules/nutrient/index.ts

import { PrismaClient } from "@prisma/client";
import { NutrientQuery } from "./domain/nutrient.repository";
import { NutrientController } from "./transport/nutrient.controller";
import { NutrientRouter } from "../../routes/v1/admin/nutrient.routes";

export function createNutrientModule(prisma: PrismaClient) {
  const query = new NutrientQuery(prisma);
  const controller = new NutrientController(query);

  return {
    adminRouter: NutrientRouter(controller),
  };
}
