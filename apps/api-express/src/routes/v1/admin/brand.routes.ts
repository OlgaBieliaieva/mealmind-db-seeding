
import { Router } from "express";
import { BrandController } from "../../../modules/brand/transport/brand.controller";

export function BrandRouter(controller: BrandController) {
  const router = Router();

  router.get("/", controller.getAll);

  return router;
}