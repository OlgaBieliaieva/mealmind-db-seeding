"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRouter = BrandRouter;
const express_1 = require("express");
function BrandRouter(controller) {
    const router = (0, express_1.Router)();
    router.get("/", controller.getAll);
    return router;
}
