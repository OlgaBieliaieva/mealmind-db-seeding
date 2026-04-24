"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyRouter = FamilyRouter;
const express_1 = require("express");
const with_family_1 = require("../../../middleware/with-family");
function FamilyRouter(controller) {
    const router = (0, express_1.Router)();
    router.use(with_family_1.withFamily);
    // =========================
    // GET FAMILY
    // =========================
    router.get("/", controller.getFamily);
    return router;
}
