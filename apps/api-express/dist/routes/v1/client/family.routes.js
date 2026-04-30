"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyClientRouter = FamilyClientRouter;
const express_1 = require("express");
const with_family_1 = require("../../../middleware/with-family");
function FamilyClientRouter(controller) {
    const router = (0, express_1.Router)();
    router.use(with_family_1.withFamily);
    router.get("/", controller.getFamily);
    router.get("/members", controller.getMembers);
    return router;
}
