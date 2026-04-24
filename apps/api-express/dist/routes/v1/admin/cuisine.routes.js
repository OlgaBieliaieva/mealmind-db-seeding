"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuisineAdminRouter = CuisineAdminRouter;
const express_1 = require("express");
function CuisineAdminRouter(controller) {
    const router = (0, express_1.Router)();
    router.get("/", controller.getAll);
    return router;
}
