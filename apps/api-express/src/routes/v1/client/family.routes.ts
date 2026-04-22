import { Router } from "express";
import { withFamily } from "../../../middleware/with-family";

import { FamilyController } from "../../../modules/family/transport/client/family.controller";

export function FamilyRouter(controller: FamilyController) {
  const router = Router();

  router.use(withFamily);

  // =========================
  // GET FAMILY
  // =========================

  router.get("/", controller.getFamily);

  return router;
}
