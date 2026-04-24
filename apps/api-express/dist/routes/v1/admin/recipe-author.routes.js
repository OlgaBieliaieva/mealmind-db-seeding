"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeAuthorRouter = RecipeAuthorRouter;
const express_1 = require("express");
function RecipeAuthorRouter(controller) {
    const router = (0, express_1.Router)();
    router.get("/", controller.getAll);
    router.post("/", controller.create);
    return router;
}
